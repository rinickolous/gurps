class LegacyEquipmentData extends foundry.abstract.DataModel<LegacyEquipmentDataSchema> {
	static override defineSchema(): LegacyEquipmentDataSchema {
		return legacyEquipmentDataSchema
	}
}

const legacyEquipmentDataSchema = {
	name: new fields.StringField({ required: true, nullable: false }),
	notes: new fields.StringField({ required: true, nullable: false }),
	pageref: new fields.StringField({ required: true, nullable: false }),
	count: new fields.NumberField({ required: true, nullable: false }),
	weight: new fields.NumberField({ required: true, nullable: false }),
	cost: new fields.NumberField({ required: true, nullable: false }),
	location: new fields.StringField({ required: true, nullable: false }),
	carried: new fields.BooleanField({ required: true, nullable: false }),
	equipped: new fields.BooleanField({ required: true, nullable: false }),
	techlevel: new fields.StringField({ required: true, nullable: false }),
	categories: new fields.StringField({ required: true, nullable: false }),
	legalityclass: new fields.StringField({ required: true, nullable: false }),
	costsum: new fields.NumberField({ required: true, nullable: false }),
	weightsum: new fields.NumberField({ required: true, nullable: false }),
	// NOTE: should be number, but is string in the legacy data
	uses: new fields.StringField({ required: true, nullable: false }),
	// NOTE: should be number, but is string in the legacy data
	maxuses: new fields.StringField({ required: true, nullable: false }),
	// TODO: check what this does
	contains: new fields.SchemaField({}),
	uuid: new fields.StringField({ required: true, nullable: false }),
	parentuuid: new fields.StringField({ required: true, nullable: false }),
	points: new fields.NumberField({ required: true, nullable: false }),
	note: new fields.StringField({ required: true, nullable: false }),
	originalName: new fields.StringField({ required: true, nullable: false }),
}

type LegacyEquipmentDataSchema = typeof legacyEquipmentDataSchema

export { LegacyEquipmentData, type LegacyEquipmentDataSchema }
