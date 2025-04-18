import fields = foundry.data.fields
class LegacyAttribute extends foundry.abstract.DataModel<LegacyAttributeSchema> {
	static override defineSchema(): LegacyAttributeSchema {
		return legacyAttributeSchema
	}
}

const legacyAttributeSchema = {
	import: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	value: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	points: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
}

type LegacyAttributeSchema = typeof legacyAttributeSchema

export { LegacyAttribute, type LegacyAttributeSchema }
