import { LegacySkillData } from "@data/legacy/skill.ts"
import fields = foundry.data.fields
class LegacySkill extends foundry.abstract.TypeDataModel<LegacySkillSchema, Item.Implementation> {
	static override defineSchema(): LegacySkillSchema {
		return legacySkillSchema
	}
}

const legacySkillSchema = {
	ski: new fields.EmbeddedDataField(LegacySkillData),
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

type LegacySkillSchema = typeof legacySkillSchema

export { LegacySkill, legacySkillSchema, type LegacySkillSchema }
