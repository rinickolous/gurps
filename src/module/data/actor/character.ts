import { BaseActorData } from "./base.ts"
import fields = foundry.data.fields
import { LegacyAttribute } from "@data/legacy/attribute.ts"
import { LegacyPool } from "@data/legacy/pool.ts"
import { MappingField } from "@data/fields/index.ts"
import { LegacyTrait, legacyTraitSchema } from "@data/legacy/trait.ts"
import { legacySkillSchema } from "@data/legacy/skill.ts"
import { legacySpellSchema } from "@data/legacy/spell.ts"
import { legacyEquipmentSchema } from "@data/legacy/equipment.ts"
import { legacyRangedSchema } from "@data/legacy/ranged.ts"
import { legacyMeleeSchema } from "@data/legacy/melee.ts"

class CharacterData extends BaseActorData<CharacterSchema> {}

/* -------------------------------------------- */

const characterSchema = {
	attributes: new fields.SchemaField({
		ST: new fields.EmbeddedDataField(LegacyAttribute),
		DX: new fields.EmbeddedDataField(LegacyAttribute),
		IQ: new fields.EmbeddedDataField(LegacyAttribute),
		HT: new fields.EmbeddedDataField(LegacyAttribute),
		WILL: new fields.EmbeddedDataField(LegacyAttribute),
		PER: new fields.EmbeddedDataField(LegacyAttribute),
		QN: new fields.EmbeddedDataField(LegacyAttribute),
	}),
	HP: new fields.EmbeddedDataField(LegacyPool),
	FP: new fields.EmbeddedDataField(LegacyPool),
	QP: new fields.EmbeddedDataField(LegacyPool),
	dodge: new fields.SchemaField({
		value: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
		enc_level: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	}),
	basicmove: new fields.SchemaField({
		value: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
		points: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	}),
	basicspeed: new fields.SchemaField({
		value: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
		points: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	}),
	parry: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	currentmove: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	// TODO: add dice field
	thrust: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	swing: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	frightcheck: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	hearing: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	tastesmell: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	vision: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	touch: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	ads: new MappingField(new fields.SchemaField(legacyTraitSchema)),
	// TODO: see if this is used
	languages: new MappingField(new fields.EmbeddedDataField(LegacyTrait)),
	skills: new MappingField(new fields.SchemaField(legacySkillSchema)),
	spells: new MappingField(new fields.SchemaField(legacySpellSchema)),
	// TODO: see if this is used
	money: new MappingField(new fields.EmbeddedDataField(LegacyTrait)),
	traits: new fields.SchemaField({
		title: new fields.StringField({ required: true, nullable: false, blank: true }),
		race: new fields.StringField({ required: true, nullable: false, blank: true }),
		height: new fields.StringField({ required: true, nullable: false, blank: true }),
		weight: new fields.StringField({ required: true, nullable: false, blank: true }),
		age: new fields.StringField({ required: true, nullable: false, blank: true }),
		birthday: new fields.StringField({ required: true, nullable: false, blank: true }),
		religion: new fields.StringField({ required: true, nullable: false, blank: true }),
		gender: new fields.StringField({ required: true, nullable: false, blank: true }),
		eyes: new fields.StringField({ required: true, nullable: false, blank: true }),
		hair: new fields.StringField({ required: true, nullable: false, blank: true }),
		hand: new fields.StringField({ required: true, nullable: false, blank: true }),
		skin: new fields.StringField({ required: true, nullable: false, blank: true }),
		sizemod: new fields.NumberField({ required: true, nullable: false, integer: true }),
		techlevel: new fields.StringField({ required: true, nullable: false, blank: true }),
		createdon: new fields.StringField({ required: true, nullable: false, blank: true }),
		modifiedon: new fields.StringField({ required: true, nullable: false, blank: true }),
		player: new fields.StringField({ required: true, nullable: false, blank: true }),
	}),
	totalpoints: new fields.SchemaField({
		attributes: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
		ads: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
		disads: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
		quirks: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
		skills: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
		spells: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
		total: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
		unspent: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
		race: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
	}),
	melee: new MappingField(new fields.SchemaField(legacyMeleeSchema)),
	ranged: new MappingField(new fields.SchemaField(legacyRangedSchema)),
	conditionalmods: new MappingField(new fields.EmbeddedDataField(LegacyConditionalMod)),
	// TODO: find structure
	hitlocations: new fields.EmbeddedDataField(),
	// TODO: make sure current object structure can migrate to this easily
	encumbrance: new fields.ArrayField(new fields.EmbeddedDataField(LegacyEncumbrance)),
	notes: new MappingField(new fields.EmbeddedDataField(LegacyNote)),
	equipment: new fields.SchemaField({
		carried: new MappingField(new fields.SchemaField(legacyEquipmentSchema)),
		other: new MappingField(new fields.SchemaField(legacyEquipmentSchema)),
	}),
	liftingmoving: new fields.SchemaField({
		basiclift: new fields.NumberField({ required: true, nullable: false }),
		carryonback: new fields.NumberField({ required: true, nullable: false }),
		onehandedlift: new fields.NumberField({ required: true, nullable: false }),
		runningshove: new fields.NumberField({ required: true, nullable: false }),
		shiftslightly: new fields.NumberField({ required: true, nullable: false }),
		shove: new fields.NumberField({ required: true, nullable: false }),
		twohandedlift: new fields.NumberField({ required: true, nullable: false }),
	}),
	reactions: new MappingField(new fields.EmbeddedDataField(LegacyReaction)),
	additionalresources: new fields.SchemaField({
		bodyplan: new fields.StringField({ required: true, nullable: false }),
		tracker: new MappingField(new fields.EmbeddedDataField(LegacyTracker)),
	}),
	conditions: new MappingField(new fields.EmbeddedDataField(LegacyCondition)),
	conditionalinjury: new fields.SchemaField({
		RT: new fields.SchemaField({
			value: new fields.NumberField({ required: true, nullable: false }),
			points: new fields.NumberField({ required: true, nullable: false }),
		}),
		injury: new fields.SchemaField({
			//TODO: may benefit from enum
			severity: new fields.StringField({ required: true, nullable: false }),
			daystoheal: new fields.NumberField({ required: true, nullable: false }),
		}),
	}),
}

/* -------------------------------------------- */

type CharacterSchema = typeof characterSchema

export { CharacterData, type CharacterSchema }
