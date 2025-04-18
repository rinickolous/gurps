import fields = foundry.data.fields

namespace Criteria {
	namespace Field {
		type Options<ModelType extends DataModel.AnyConstructor> = fields.EmbeddedDataField.Options<ModelType> & {
			choices?: Record<string, string>
		}
	}

	type ConstructorOptions = {
		toggleable?: boolean
		replaceable?: boolean
	}
}
