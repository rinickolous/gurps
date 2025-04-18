import fields = foundry.data.fields
class LegacyMelee extends foundry.abstract.TypeDataModel<LegacyMeleeSchema, Item.Implementation> {
	static override defineSchema(): LegacyMeleeSchema {
		return legacyMeleeSchema
	}
}

const legacyMeleeSchema = {
	mel: new fields.SchemaField({
		name: new fields.StringField({ required: true, nullable: false }),
		notes: new fields.StringField({ required: true, nullable: false }),
		pageref: new fields.StringField({ required: true, nullable: false }),
		// TODO: check what this does
		contains: new fields.SchemaField({}),
		uuid: new fields.StringField({ required: true, nullable: false }),
		parentuuid: new fields.StringField({ required: true, nullable: false }),
		import: new fields.NumberField({ required: true, nullable: false }),
		// TODO: damge field?
		damage: new fields.StringField({ required: true, nullable: false }),
		// TODO: strength field?
		st: new fields.StringField({ required: true, nullable: false }),
		mode: new fields.StringField({ required: true, nullable: false }),
		level: new fields.NumberField({ required: true, nullable: false }),
		// TODO: weight field?
		weight: new fields.StringField({ required: true, nullable: false }),
		techlevel: new fields.NumberField({ required: true, nullable: false }),
		cost: new fields.StringField({ required: true, nullable: false }),
		reach: new fields.StringField({ required: true, nullable: false }),
		parry: new fields.StringField({ required: true, nullable: false }),
		baseParryPenalty: new fields.NumberField({ required: true, nullable: false }),
		block: new fields.StringField({ required: true, nullable: false }),
		otf: new fields.StringField({ required: true, nullable: false }),
		checkotf: new fields.StringField({ required: true, nullable: false }),
		duringotf: new fields.StringField({ required: true, nullable: false }),
		passotf: new fields.StringField({ required: true, nullable: false }),
		failotf: new fields.StringField({ required: true, nullable: false }),
		originalName: new fields.StringField({ required: true, nullable: false }),
		consumeAction: new fields.BooleanField({ required: true, nullable: false }),
	}),
}

type LegacyMeleeSchema = typeof legacyMeleeSchema

export { LegacyMelee, legacyMeleeSchema, type LegacyMeleeSchema }
