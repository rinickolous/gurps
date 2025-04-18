class LegacyTraitData extends foundry.abstract.DataModel<LegacyTraitDataSchema> {
	static override defineSchema(): LegacyTraitDataSchema {
		return legacyTraitDataSchema
	}
}

const legacyTraitDataSchema = {
	name: new fields.StringField({ required: true, nullable: false }),
	notes: new fields.StringField({ required: true, nullable: false }),
	pageref: new fields.StringField({ required: true, nullable: false }),
	// TODO: check what this does
	contains: new fields.SchemaField({}),
	uuid: new fields.StringField({ required: true, nullable: false }),
	parentuuid: new fields.StringField({ required: true, nullable: false }),
	points: new fields.NumberField({ required: true, nullable: false }),
	userdesc: new fields.StringField({ required: true, nullable: false }),
	note: new fields.StringField({ required: true, nullable: false }),
	originalName: new fields.StringField({ required: true, nullable: false }),
}

type LegacyTraitDataSchema = typeof legacyTraitDataSchema

export { LegacyTraitData, type LegacyTraitDataSchema }
