import fields = foundry.data.fields
class LegacyRanged extends foundry.abstract.TypeDataModel<LegacyRangedSchema, Item.Implementation> {
	static override defineSchema(): LegacyRangedSchema {
		return legacyRangedSchema
	}
}

const legacyRangedSchema = {
	rng: new fields.SchemaField({
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
		bulk: new fields.StringField({ required: true, nullable: false }),
		legalityclass: new fields.StringField({ required: true, nullable: false }),
		ammo: new fields.StringField({ required: true, nullable: false }),
		acc: new fields.StringField({ required: true, nullable: false }),
		range: new fields.StringField({ required: true, nullable: false }),
		rof: new fields.StringField({ required: true, nullable: false }),
		shots: new fields.StringField({ required: true, nullable: false }),
		rcl: new fields.StringField({ required: true, nullable: false }),
		halfd: new fields.StringField({ required: true, nullable: false }),
		max: new fields.StringField({ required: true, nullable: false }),
		otf: new fields.StringField({ required: true, nullable: false }),
		checkotf: new fields.StringField({ required: true, nullable: false }),
		duringotf: new fields.StringField({ required: true, nullable: false }),
		passotf: new fields.StringField({ required: true, nullable: false }),
		failotf: new fields.StringField({ required: true, nullable: false }),
		originalName: new fields.StringField({ required: true, nullable: false }),
		consumeAction: new fields.BooleanField({ required: true, nullable: false }),
	}),
}

type LegacyRangedSchema = typeof legacyRangedSchema

export { LegacyRanged, legacyRangedSchema, type LegacyRangedSchema }
