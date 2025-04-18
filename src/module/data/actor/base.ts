import fields = foundry.data.fields

class BaseActorData<Schema extends fields.DataSchema> extends foundry.abstract.TypeDataModel<
  Schema,
  Actor.Implementation
> {}

/* -------------------------------------------- */

/* -------------------------------------------- */

export { BaseActorData }
