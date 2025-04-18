import fields = foundry.data.fields
class LegacyPool extends foundry.abstract.DataModel<LegacyPoolSchema> {
	static override defineSchema(): LegacyPoolSchema {
		return legacyPoolSchema
	}
}

const legacyPoolSchema = {
	value: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	min: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	max: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	points: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
}

type LegacyPoolSchema = typeof legacyPoolSchema

export { LegacyPool, type LegacyPoolSchema }
