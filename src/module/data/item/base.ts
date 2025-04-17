import fields = foundry.data.fields

class BaseItemData<Schema extends BaseItemSchema> extends foundry.abstract.TypeDataModel<Schema, Item.Implementation> {}

/* -------------------------------------------- */

const baseItemSchema = {
  name: new fields.StringField({ required: true, nullable: false, blank: false }),
  description: new fields.HTMLField({ required: true, nullable: false, initial: '' }),
  notes: new fields.StringField({ required: true, nullable: false }),
  tags: new fields.ArrayField(new fields.StringField({ required: true, nullable: false })),
  reference: new fields.StringField({ required: true, nullable: false }),
  referenceHighlight: new fields.StringField({ required: true, nullable: false }),
  actions: new ActionsField({ required: true, nullable: false }),
  features: new FeaturesField({ required: true, nullable: false }),
  prereqs: new PrereqsField({ required: true, nullable: false }),
}

type BaseItemSchema = typeof baseItemSchema

/* -------------------------------------------- */

export { BaseItemData }
