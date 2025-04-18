import fields = foundry.data.fields
class LegacyEquipment extends foundry.abstract.TypeDataModel<LegacyEquipmentSchema, Item.Implementation> {
	static override defineSchema(): LegacyEquipmentSchema {
		return legacyEquipmentSchema
	}
}

const legacyEquipmentSchema = {
	eqt: new fields.SchemaField({
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
	}),
	// TODO: check what these fields do
	melee: new fields.SchemaField({}),
	ranged: new fields.SchemaField({}),
	ads: new fields.SchemaField({}),
	skills: new fields.SchemaField({}),
	spells: new fields.SchemaField({}),
	bonuses: new fields.StringField({ required: true, nullable: false }),
	itemModifiers: new fields.StringField({ required: true, nullable: false }),
	// NOTE: redundant with eqt?
	carried: new fields.BooleanField({ required: true, nullable: false }),
	equipped: new fields.BooleanField({ required: true, nullable: false }),
	globalid: new fields.StringField({ required: true, nullable: false }),
	importid: new fields.StringField({ required: true, nullable: false }),
	importFrom: new fields.StringField({ required: true, nullable: false }),
	fromItem: new fields.StringField({ required: true, nullable: false }),
	addToQuickRoll: new fields.BooleanField({ required: true, nullable: false }),
}

type LegacyEquipmentSchema = typeof legacyEquipmentSchema

export { LegacyEquipment, legacyEquipmentSchema, type LegacyEquipmentSchema }
