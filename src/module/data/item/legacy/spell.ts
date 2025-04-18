import { LegacySpellData } from "@data/legacy/spell.ts"
import fields = foundry.data.fields
class LegacySpell extends foundry.abstract.TypeDataModel<LegacySpellSchema, Item.Implementation> {
	static override defineSchema(): LegacySpellSchema {
		return legacySpellSchema
	}
}

const legacySpellSchema = {
	spl: new fields.EmbeddedDataField(LegacySpellData),
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
	addToQuickRoll: new fields.BooleanField({ required: true, nullable: false }),
	modifierTags: new fields.StringField({ required: true, nullable: false }),
}

type LegacySpellSchema = typeof legacySpellSchema

export { LegacySpell, legacySpellSchema, type LegacySpellSchema }
