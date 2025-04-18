import { LegacyEquipmentData } from "@data/legacy/equipment.ts"
import fields = foundry.data.fields
class LegacyEquipment extends foundry.abstract.TypeDataModel<LegacyEquipmentSchema, Item.Implementation> {
	static override defineSchema(): LegacyEquipmentSchema {
		return legacyEquipmentSchema
	}
}

const legacyEquipmentSchema = {
	eqt: new fields.EmbeddedDataField(LegacyEquipmentData),
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
