import fields = foundry.data.fields

namespace ExtendedField {
	type Options = fields.EmbeddedDataField.Options & {
		toggleable?: boolean
		replaceable?: boolean
	}

	/* -------------------------------------------- */

	type _BaseConfig = {
		editable?: boolean
		replacements?: Map<string, string>
	}

	/* -------------------------------------------- */

	type ToInputConfig<InitializedType> = _BaseConfig & fields.DataField.ToInputConfig<InitializedType>

	/* -------------------------------------------- */

	type ToInputConfigWithOptions<InitializedType> = _BaseConfig &
		fields.DataField.ToInputConfigWithOptions<InitializedType>

	/* -------------------------------------------- */

	type ToInputConfigWithChoices<
		InitializedType,
		Choices extends fields.DataField.AnyChoices | undefined,
	> = _BaseConfig & fields.DataField.ToInputConfigWithChoices<InitializedType, Choices>
}
