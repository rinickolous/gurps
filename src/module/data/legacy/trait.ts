import fields = foundry.data.fields
class LegacyTrait extends foundry.abstract.TypeDataModel<LegacyTraitSchema, Item.Implementation> {
	static override defineSchema(): LegacyTraitSchema {
		return legacyTraitSchema
	}
}

const legacyTraitSchema = {
	fea: new fields.SchemaField({
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
	}),
	// TODO: check what these fields do
	melee: new fields.SchemaField({}),
	ranged: new fields.SchemaField({}),
	ads: new fields.SchemaField({}),
	skills: new fields.SchemaField({}),
	spells: new fields.SchemaField({}),
	bonuses: new fields.StringField({ required: true, nullable: false }),
	itemModifiers: new fields.StringField({ required: true, nullable: false }),
	globalid: new fields.StringField({ required: true, nullable: false }),
	importid: new fields.StringField({ required: true, nullable: false }),
	importFrom: new fields.StringField({ required: true, nullable: false }),
	fromItem: new fields.StringField({ required: true, nullable: false }),
	checkotf: new fields.StringField({ required: true, nullable: false }),
	duringotf: new fields.StringField({ required: true, nullable: false }),
	passotf: new fields.StringField({ required: true, nullable: false }),
	failotf: new fields.StringField({ required: true, nullable: false }),
}

type LegacyTraitSchema = typeof legacyTraitSchema

export { LegacyTrait, legacyTraitSchema, type LegacyTraitSchema }
