import ChatProcessor from './chat-processor.js'
import { i18n, zeroFill } from '../../lib/utilities.js'

export default class TrackerChatProcessor extends ChatProcessor {
  help() {
    return '/tr&lt;N&gt; (or /tr (&lt;name&gt;)) &lt;formula&gt;'
  }

  matches(line) {
    this.match = line.match(/^\/(tracker|tr|rt|resource)([0123])?( *\(([^\)]+)\))? +([+-=] *\d+)?(reset)?(.*)/i)
    return !!this.match
  }

  usagematches(line) {
    return line.match(/^[\/\?](tracker|tr|rt|resource)([0123])?( *\(([^\)]+)\))?$/i)
  }
  usage() {
    return i18n('GURPS.chat.Tracker')
  }

  async process(line) {
    let m = this.match
    let actor = GURPS.LastActor
    if (!actor) {
      ui.notifications.warn(i18n('GURPS.youMustHaveACharacterSelected'))
      return false
    }

    let tracker = parseInt(m[2])
    let display = tracker

    // find tracker
    if (!!m[3]) {
      let pattern = '^' + m[3].trim().replace(/\(\)/, '')
      tracker = -1
      for (const [key, value] of Object.entries(actor.system.additionalresources.tracker)) {
        if (value.name.match(pattern)) {
          tracker = key
          display = '(' + value.name + ')'
        }
      }
      if (tracker == -1) {
        ui.notifications.warn(`${i18n('GURPS.noResourceTrackerMatched', 'No Resource Tracker matched')} '${m[3]}'`)
        return false
      }
    }

    let theTrackerKey = zeroFill(tracker, 4)
    let theTracker = actor.system.additionalresources.tracker[theTrackerKey]
    if (!theTracker) {
      ui.notifications.warn(`${i18n('GURPS.noResourceTrackerMatched', 'No Resource Tracker matched')} 'tr${m[2]}'`)
      return false
    }

    if (!!m[6]) {
      // reset -- Damage Tracker's reset to zero
      let value = !!theTracker.isDamageTracker ? parseInt(theTracker.min) : parseInt(theTracker.max)
      //if (!!theTracker.isDamageTracker) max = 0
      await actor.update({ ['data.additionalresources.tracker.' + theTrackerKey + '.value']: value })
      this.prnt(
        `${i18n('GURPS.resourceTracker')}${display} ${i18n('GURPS.resetTo')} ${value}`
      )
      return true
    }

    if (!m[5]) {
      ui.notifications.warn(`${i18n('GURPS.unrecognizedFormat', 'Unrecognized format')} '${line}'`)
      return false
    }

    let delta = parseInt(m[5].replace(/ /g, ''))
    if (isNaN(delta)) {
      // only happens with '='
      let value = parseInt(m[5].substr(1).replace(/ /g, ''))
      if (isNaN(value)) {
        ui.notifications.warn(`${i18n('GURPS.unrecognizedFormat', 'Unrecognized format')} '${line}'`)
        return false
      } else {
        value = theTracker.isMaximumEnforced && value > parseInt(theTracker.max) ? parseInt(theTracker.max) : value
        value = theTracker.isMinimumEnforced && value < parseInt(theTracker.min) ? parseInt(theTracker.min) : value
        await actor.update({ ['data.additionalresources.tracker.' + theTrackerKey + '.value']: value })
        this.prnt(`${i18n('GURPS.resourceTracker')}${display} set to ${value}`)
        return true
      }
    } else {
      let max = theTracker.max == 0 ? Number.MAX_SAFE_INTEGER : theTracker.max
      let min = theTracker.min
      let value = parseInt(theTracker.value) + delta

      if (value > max) {
        ui.notifications.warn(
          `${i18n('GURPS.exceededMax', 'Exceeded MAX')}:${max} ${i18n('GURPS.for')} ${i18n(
            'GURPS.resourceTracker'
          )}${display}`
        )
        if (theTracker.isMaximumEnforced) return false
      }
      if (value < min) {
        ui.notifications.warn(
          `${i18n('GURPS.resultBelowZero', 'Result below zero')}: ${i18n('GURPS.resourceTracker')}${display}`
        )
        if (theTracker.isMinimumEnforced) return false
      }
      await actor.update({ ['system.additionalresources.tracker.' + theTrackerKey + '.value']: value })
      this.prnt(`${i18n('GURPS.resourceTracker')}${display} ${m[5]} = ${value}`)
      return true
    }
  }
}
