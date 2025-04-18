import { i18n } from "@util"

class ExtendedNumberField<
	const Options extends ExtendedField.Options = fields.NumberField.DefaultOptions,
	const AssignmentType = fields.NumberField.AssignmentType<Options>,
	const InitializedType = fields.NumberField.InitializedType<Options>,
	const PersistedType extends number | null | undefined = fields.NumberField.InitializedType<Options>,
> extends fields.NumberField<Options, AssignmentType, InitializedType, PersistedType> {
	toggleable: boolean
	replaceable: boolean

	/* -------------------------------------------- */

	constructor(options?: Options, context?: fields.DataField.Context) {
		super(options, context)

		this.toggleable = options?.toggleable ?? false
		this.replaceable = options?.replaceable ?? false
	}

	/* -------------------------------------------- */

	override toInput(
		config?: ExtendedField.ToInputConfig<InitializedType> | ExtendedField.ToInputConfigWithOptions<InitializedType>
	): HTMLElement | HTMLCollection
	override toInput(
		config?: ExtendedField.ToInputConfigWithChoices<InitializedType, Options["choices"]>
	): HTMLElement | HTMLCollection {
		return super.toInput(config)
	}

	/* -------------------------------------------- */

	protected override _toInput(
		config: ExtendedField.ToInputConfig<InitializedType> | ExtendedField.ToInputConfigWithOptions<InitializedType>
	): HTMLElement | HTMLCollection
	protected override _toInput(
		config: ExtendedField.ToInputConfigWithChoices<InitializedType, Options["choices"]>
	): HTMLElement | HTMLCollection {
		// NOTE: NumberFields can't actually be replaceable, but we keep the option for consistency
		//
		// if (this.options.replaceable && config.editable === false && config.replacements && "value" in config) {
		// 	config.value = Nameable.applyToElement(String(config.value), config.replacements)
		// }

		if (config.value === undefined) config.value = this.getInitialValue({})
		config.choices ??= this.choices
		if (config.choices && !config.options) {
			config.options = fields.StringField._getChoices(config)
			delete config.choices
			delete config.valueAttr
			delete config.labelAttr
			if (!this.required) config.blank ??= ""
		}

		if (config.editable === false) {
			const element = document.createElement("span")
			// TODO: maybe revise whether just defining this with a class is good enough
			element.classList.add("input-disabled")
			if ("value" in config) {
				if (config.options) element.innerHTML = i18n.localize(config.options[config.value as string]) ?? ""
				else element.innerHTML = String(config.value)
				return element
			}
		}

		// TODO: refine type check
		if (config.options) return foundry.applications.fields.createSelectInput(config as any)
		return foundry.applications.fields.createTextInput(config)
	}
}

export { ExtendedNumberField }
