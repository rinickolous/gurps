import { AnyObject, SimpleMerge } from 'fvtt-types/utils'
import fields = foundry.data.fields

declare namespace MappingField {
  /**
   * A shorthand for the options of an MappingField class.
   * @typeParam AssignmentElementType - the assignment type of the elements in the record
   */
  type Options<AssignmentElementType> = fields.DataField.Options<BaseAssignmentType<AssignmentElementType>> & {
    initialKeys: string[] | null
    initialValue?: AssignmentElementType | null
    initialKeysOnly?: boolean
  }

  type AnyOptions = Options<unknown>

  /* -------------------------------------------- */

  /**
   * @typeParam AssignmentElementType - the assignment type of the elements in the array
   */
  type BaseAssignmentType<AssignmentElementType> = Record<string | number, AssignmentElementType>
  // | Iterable<AssignmentElementType>
  // | AssignmentElementType[]
  // | AssignmentElementType

  /* -------------------------------------------- */

  /**
   * The type of the default options for the {@link ArrayField | `ArrayField`} class.
   * @typeParam AssignmentElementType - the assignment type of the elements in the array
   */
  type DefaultOptions<AssignmentElementType> = SimpleMerge<
    fields.DataField.DefaultOptions,
    {
      required: true
      nullable: false
      initial: () => Record<string | number, AssignmentElementType>
      initialKeys: string[] | null
      initialValue: AssignmentElementType | null
      initialKeysOnly: boolean
    }
  >

  /* -------------------------------------------- */

  /**
   * A helper type for the given options type merged into the default options of the ArrayField class.
   * @typeParam AssignmentElementType - the assignment type of the elements of the ArrayField
   * @typeParam _Options                  - the options that override the default options
   */
  type MergedOptions<AssignmentElementType, _Options extends AnyOptions> = SimpleMerge<
    DefaultOptions<AssignmentElementType>,
    _Options
  >

  /* -------------------------------------------- */

  /**
   * A type to infer the assignment element type of an ArrayField from its ElementFieldType.
   * @typeParam ElementFieldType - the DataField type of the elements in the ArrayField
   */
  type AssignmentElementType<ElementFieldType extends fields.DataField.Any> =
    ElementFieldType extends fields.DataField<infer _1, infer Assign, infer _2, infer _3>
      ? Assign
      : // : ElementFieldType extends abstract new (
        //       ...args: infer _1
        //     ) => foundry.abstract.DataModel<infer Schema, infer _2, infer _3>
        //   ? fields.SchemaField.AssignmentData<Schema>
        never

  /* -------------------------------------------- */

  /**
   * A type to infer the initialized element type of an ArrayField from its ElementFieldType.
   * @typeParam ElementFieldType - the DataField type of the elements in the ArrayField
   */
  type InitializedElementType<ElementFieldType extends fields.DataField.Any> =
    ElementFieldType extends fields.DataField<infer _1, infer _2, infer Init, infer _3>
      ? Init
      : // : ElementFieldType extends abstract new (
        //       ...args: infer _4
        //     ) => foundry.abstract.DataModel<infer Schema, infer _5, infer _6>
        //   ? fields.SchemaField.InitializedData<Schema>
        never

  /* -------------------------------------------- */

  /**
   * A type to infer the initialized element type of an ArrayField from its ElementFieldType.
   * @typeParam ElementFieldType - the DataField type of the elements in the ArrayField
   */
  type PersistedElementType<ElementFieldType extends fields.DataField.Any> =
    ElementFieldType extends fields.DataField<infer _1, infer _2, infer _3, infer Persist>
      ? Persist
      : // : ElementFieldType extends abstract new (
        //       ...args: infer _4
        //     ) => foundry.abstract.DataModel<infer Schema, infer _5, infer _6>
        //   ? fields.SchemaField.SourceData<Schema>
        never

  /* -------------------------------------------- */

  /**
   * A shorthand for the assignment type of an ArrayField class.
   * @typeParam AssignmentElementType - the assignment type of the elements of the ArrayField
   * @typeParam Opts                  - the options that override the default options
   */
  type AssignmentType<AssignmentElementType, Opts extends AnyOptions> = fields.DataField.DerivedAssignmentType<
    BaseAssignmentType<AssignmentElementType>,
    MergedOptions<AssignmentElementType, Opts>
  >

  /* -------------------------------------------- */

  /**
   * A shorthand for the initialized type of an ArrayField class.
   * @typeParam AssignmentElementType  - the assignment type of the elements of the ArrayField
   * @typeParam InitializedElementType - the initialized type of the elements of the ArrayField
   * @typeParam Opts                   - the options that override the default options
   */
  type InitializedType<
    AssignmentElementType,
    InitializedElementType,
    Opts extends AnyOptions,
  > = fields.DataField.DerivedInitializedType<
    Record<string | number, InitializedElementType>,
    MergedOptions<AssignmentElementType, Opts>
  >

  /* -------------------------------------------- */

  /**
   * A shorthand for the persisted type of an ArrayField class.
   * @typeParam AssignmentElementType - the assignment type of the elements of the ArrayField
   * @typeParam PersistedElementType  - the persisted type of the elements of the ArrayField
   * @typeParam Opts                  - the options that override the default options
   */
  type PersistedType<
    AssignmentElementType,
    PersistedElementType,
    Opts extends AnyOptions,
  > = fields.DataField.DerivedInitializedType<
    Record<string | number, PersistedElementType>,
    MergedOptions<AssignmentElementType, Opts>
  >

  /* -------------------------------------------- */

  type InitialValueBuilder = (key: string, initial: AnyObject, existing: AnyObject) => object
}

/* -------------------------------------------- */

class MappingField<
  const ElementFieldType extends fields.DataField.Any,
  const Options extends MappingField.AnyOptions = MappingField.DefaultOptions<
    MappingField.AssignmentElementType<ElementFieldType>
  >,
  const AssignmentElementType = MappingField.AssignmentElementType<ElementFieldType>,
  const InitializedElementType = MappingField.InitializedElementType<ElementFieldType>,
  const AssignmentType = MappingField.AssignmentType<AssignmentElementType, Options>,
  const InitializedType = MappingField.InitializedType<AssignmentElementType, InitializedElementType, Options>,
  const PersistedElementType = MappingField.PersistedElementType<ElementFieldType>,
  const PersistedType extends
    | Record<string | number, PersistedElementType>
    | null
    | undefined = MappingField.PersistedType<AssignmentElementType, PersistedElementType, Options>,
> extends fields.ObjectField<Options, AssignmentType, InitializedType, PersistedType> {
  model: ElementFieldType
  declare initialKeys: string[]
  declare initialValue: MappingField.InitialValueBuilder
  initialKeysOnly = false

  /* -------------------------------------------- */

  constructor(model: ElementFieldType, options?: Options) {
    if (!(model instanceof foundry.data.fields.DataField)) {
      throw new Error('MappingField must have a DataField as its contained element')
    }
    super(options)

    this.model = model
    model.parent = this
  }

  /* -------------------------------------------- */

  static override get _defaults(): MappingField.AnyOptions {
    return foundry.utils.mergeObject(super._defaults, {
      initialKeys: null,
      initialValue: null,
      initialKeysOnly: false,
    })
  }

  /* -------------------------------------------- */

  protected override _cleanType(value: InitializedType, options?: fields.DataField.CleanOptions): InitializedType {
    Object.entries(value as AnyObject).forEach(([k, v]) => {
      if (k.startsWith('-=')) return
      ;(value as any)[k] = this.model.clean(v, options)
    })
    return value
  }

  /* -------------------------------------------- */

  override getInitialValue(data: fields.DataField.CleanOptions['source']): InitializedType {
    let keys = this.initialKeys
    const initial = super.getInitialValue(data)
    if (!keys || !foundry.utils.isEmpty(initial)) return initial
    if (!(keys instanceof Array)) keys = Object.keys(keys)
    for (const key of keys) (initial as any)[key] = this._getInitialValueForKey(key)
    return initial
  }

  /* -------------------------------------------- */

  /**
   * Get the initial value for the provided key.
   * @param {string} key       Key within the object being built.
   * @param {object} [object]  Any existing mapping data.
   * @returns {*}              Initial value based on provided field type.
   */
  _getInitialValueForKey(key: string, object?: AnyObject): object {
    const initial = this.model.getInitialValue({})
    return this.initialValue?.(key, initial, object ?? {}) ?? initial
  }

  /* -------------------------------------------- */

  protected override _validateType(
    value: InitializedType,
    options?: fields.DataField.ValidationOptions<fields.DataField.Any>
  ) {
    if (foundry.utils.getType(value) !== 'Object') throw new Error('must be an Object')
    const errors = this._validateValues(value, options)
    if (!foundry.utils.isEmpty(errors)) {
      const failure = new foundry.data.validation.DataModelValidationFailure({})
      failure.elements = Object.entries(errors).map(([id, failure]) => ({ id, failure }))
      throw failure.asError()
    }
  }

  /* -------------------------------------------- */

  /**
   * Validate each value of the object.
   */
  _validateValues(
    value: InitializedType,
    options?: fields.DataField.ValidationOptions<fields.DataField.Any>
  ): Record<string, foundry.data.validation.DataModelValidationFailure> {
    const errors: Record<string, foundry.data.validation.DataModelValidationFailure> = {}
    for (const [k, v] of Object.entries(value as object)) {
      if (k.startsWith('-=')) continue
      const error = this.model.validate(v, options)
      if (error) errors[k] = error
    }
    return errors
  }

  /* -------------------------------------------- */

  override initialize(
    value: PersistedType,
    model: foundry.abstract.DataModel.Any,
    options?: AnyObject
  ): (() => InitializedType | null) | InitializedType {
    if (!value) return value as unknown as InitializedType

    const obj: Record<string, unknown> = {}
    const initialKeys = this.initialKeys instanceof Array ? this.initialKeys : Object.keys(this.initialKeys ?? {})
    const keys = this.initialKeysOnly ? initialKeys : Object.keys(value)
    for (const key of keys) {
      const data = (value as Record<string, unknown>)[key] ?? this._getInitialValueForKey(key, value)
      obj[key] = this.model.initialize(data, model, options)
    }
    return obj as unknown as InitializedType
  }

  /* -------------------------------------------- */

  protected override _getField(path: string[]): unknown {
    if (path.length === 0) return this
    else if (path.length === 1) return this.model
    path.shift()
    // @ts-expect-error ignoring protected in this case
    return this.model._getField(path)
  }
}

export { MappingField }
