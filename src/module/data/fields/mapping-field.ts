import { AnyObject, SimpleMerge } from 'fvtt-types/utils'
import fields = foundry.data.fields

fields.ArrayField

namespace MappingField {
  export type ElementFieldType = fields.DataField.Any

  export type Options<_ElementFieldType> = fields.DataField.Options<_ElementFieldType>

  export type AnyOptions = Options<any>

  export type DefaultOptions<_ElementFieldType extends ElementFieldType> = fields.ObjectField.DefaultOptions

  export type MergedOptions<_ElementFieldType extends ElementFieldType, _Options extends AnyOptions> = SimpleMerge<
    DefaultOptions<_ElementFieldType>,
    _Options
  >

  /* -------------------------------------------- */

  // export type BaseAssignmentType<_ElementFieldType extends ElementFieldType> = Record<
  //   number | string,
  //   fields.DataField.AssignmentType<_ElementFieldType>
  // >

  /* -------------------------------------------- */

  export type AssignmentTypeElementType<_ElementFieldType extends ElementFieldType> =
    _ElementFieldType extends fields.DataField<any, infer Assign, any, any> ? Assign : never

  export type AssignmentType<
    _ElementFieldType extends ElementFieldType,
    _Options extends Options<_ElementFieldType>,
  > = fields.DataField.DerivedAssignmentType<
    Record<string | number, fields.DataField.AssignmentType<_ElementFieldType>>,
    MergedOptions<_ElementFieldType, _Options>
  >

  /* -------------------------------------------- */

  export type InitialilzedTypeElementType<_ElementFieldType extends ElementFieldType> =
    _ElementFieldType extends fields.DataField<any, any, infer Init, any> ? Init : never

  export type InitializedType<
    _ElementFieldType extends ElementFieldType,
    _Options extends Options<_ElementFieldType>,
  > = fields.DataField.DerivedInitializedType<
    Record<string | number, fields.DataField.InitializedType<_ElementFieldType>>,
    MergedOptions<_ElementFieldType, _Options>
  >

  /* -------------------------------------------- */

  export type PersistedElementType<_ElementFieldType extends ElementFieldType> =
    _ElementFieldType extends fields.DataField<any, any, any, infer Persist> ? Persist : never

  export type PersistedType<
    _ElementFieldType extends ElementFieldType,
    _Options extends Options<_ElementFieldType>,
  > = fields.DataField.DerivedInitializedType<
    Record<string | number, fields.DataField.PersistedTypeFor<_ElementFieldType>>,
    MergedOptions<_ElementFieldType, _Options>
  >

  /* -------------------------------------------- */
}

class MappingField<
  const ElementFieldType extends fields.DataField.Any,
  const Options extends MappingField.AnyOptions = MappingField.DefaultOptions<
    MappingField.AssignmentTypeElementType<ElementFieldType>
  >,
  const AssignmentType = MappingField.AssignmentType<ElementFieldType, Options>,
  const InitializedType = MappingField.InitializedType<ElementFieldType, Options>,
  const PersistedType extends
    | Record<string | number, MappingField.PersistedElementType<ElementFieldType>>
    | null
    | undefined = MappingField.PersistedType<ElementFieldType, Options>,
> extends fields.ObjectField<Options, AssignmentType, InitializedType, PersistedType> {
  model: fields.DataField.Any

  /* -------------------------------------------- */

  constructor(model: ElementFieldType, options?: Options) {
    super(options)
    this.model = model
  }
}

// class TestField<Options extends MappingField.Options<AnyObject>> extends MappingField<
//   fields.EmbeddedDataField<typeof TestModel2>,
//   Options
// > {
//   constructor(options?: Options) {
//     super(new fields.EmbeddedDataField(TestModel2), options)
//   }
// }

class TestModel extends foundry.abstract.DataModel<TestSchema> {
  testFunc() {
    Object.entries(this.test).forEach(([key, value]) => {
      key
      value
    })
  }
}

class TestModel2 extends foundry.abstract.DataModel<TestSchema2> {}

const testSchema = {
  test: new MappingField<fields.EmbeddedDataField<typeof TestModel2>>(new fields.EmbeddedDataField(TestModel2)),
}

const testSchema2 = { foo: new fields.StringField() }

type TestSchema = typeof testSchema

type TestSchema2 = typeof testSchema2

export { MappingField }
