class LegacySpellData extends foundry.abstract.DataModel<LegacySpellDataSchema> {
	static override defineSchema(): LegacySpellDataSchema {
		return legacySpellDataSchema
	}
}

const legacySpellDataSchema = {
	name: new fields.StringField({ required: true, nullable: false }),
	notes: new fields.StringField({ required: true, nullable: false }),
	pageref: new fields.StringField({ required: true, nullable: false }),
	// TODO: check what this does
	contains: new fields.SchemaField({}),
	uuid: new fields.StringField({ required: true, nullable: false }),
	parentuuid: new fields.StringField({ required: true, nullable: false }),
	points: new fields.NumberField({ required: true, nullable: false }),
	import: new fields.NumberField({ required: true, nullable: false }),
	level: new fields.NumberField({ required: true, nullable: false }),
	class: new fields.StringField({ required: true, nullable: false }),
	college: new fields.StringField({ required: true, nullable: false }),
	cost: new fields.StringField({ required: true, nullable: false }),
	maintain: new fields.StringField({ required: true, nullable: false }),
	duration: new fields.StringField({ required: true, nullable: false }),
	resist: new fields.StringField({ required: true, nullable: false }),
	casttime: new fields.StringField({ required: true, nullable: false }),
	difficulty: new fields.StringField({ required: true, nullable: false }),
	relativelevel: new fields.NumberField({ required: true, nullable: false }),
	otf: new fields.StringField({ required: true, nullable: false }),
	checkotf: new fields.StringField({ required: true, nullable: false }),
	duringotf: new fields.StringField({ required: true, nullable: false }),
	passotf: new fields.StringField({ required: true, nullable: false }),
	failotf: new fields.StringField({ required: true, nullable: false }),
	originalName: new fields.StringField({ required: true, nullable: false }),
	consumeAction: new fields.BooleanField({ required: true, nullable: false }),
}

type LegacySpellDataSchema = typeof legacySpellDataSchema

export { LegacySpellData, type LegacySpellDataSchema }
