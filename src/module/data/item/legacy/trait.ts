import { LegacyTraitData } from "@data/legacy/trait.ts"
import fields = foundry.data.fields
class LegacyTrait extends foundry.abstract.TypeDataModel<LegacyTraitSchema, Item.Implementation> {
	static override defineSchema(): LegacyTraitSchema {
		return legacyTraitSchema
	}
}

const legacyTraitSchema = {
	fea: new fields.EmbeddedDataField(LegacyTraitData),
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
