import fields = foundry.data.fields

abstract class BaseFeature<Schema extends BaseFeatureSchema> extends foundry.abstract.DataModel<Schema> {
  static override defineSchema(): BaseFeatureSchema {
    return baseFeatureSchema
  }

  /* -------------------------------------------- */
}

const baseFeatureSchema = {
  type: new fields.StringField({ required: true, nullable: false }),
  value: new fields.NumberField({ required: true, nullable: false }),
}

type BaseFeatureSchema = typeof baseFeatureSchema
