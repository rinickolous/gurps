import { Nameable, StringComparison } from "@util"
import DataModel = foundry.abstract.DataModel
import fields = foundry.data.fields
import { ExtendedStringField } from "./extended-string-field.ts"

class StringCriteriaField<
	const Options extends Criteria.Field.Options<typeof StringCriteria>,
> extends fields.EmbeddedDataField<typeof StringCriteria, Options> {
	constructor(options?: Options, context?: fields.DataField.Context) {
		if (options && "choices" in options) {
			super(StringCriteria, options, context)
			this.fields.compare.choices = options.choices
		} else {
			super(StringCriteria, options, context)
		}
	}
}

class StringCriteria<
	const Parent extends DataModel.Any | null = null,
	const ExtraConstructorOptions extends Criteria.ConstructorOptions = {},
> extends DataModel<StringCriteriaSchema, Parent, ExtraConstructorOptions> {
	constructor(
		data?: DataModel.CreateData<StringCriteriaSchema>,
		options?: DataModel.DataValidationOptions<Parent> & ExtraConstructorOptions
	) {
		super(data, options)

		if (options) {
			if ("toggleable" in options) {
				this.schema.fields.compare.toggleable = options.toggleable ?? false
				this.schema.fields.qualifier.toggleable = options.toggleable ?? false
			}

			if ("replaceable" in options) {
				this.schema.fields.qualifier.replaceable = options.toggleable ?? false
			}
		}
	}

	/* -------------------------------------------- */

	static override defineSchema(): StringCriteriaSchema {
		return stringCriteriaSchema
	}

	/* -------------------------------------------- */

	matches(replacements: Map<string, string>, value: string): boolean {
		value = Nameable.apply(value, replacements)
		return StringComparison.compare(this.compare, this.qualifier, value)
	}

	/* -------------------------------------------- */

	matchesList(replacements: Map<string, string>, value: string): boolean {
		value = Nameable.apply(value, replacements)
		if (value.length === 0) return this.matches(replacements, "")
		let matches = 0
		for (const one of value) {
			if (this.matches(replacements, one)) matches += 1
		}
		switch (this.compare) {
			case StringComparison.Option.AnyString:
			case StringComparison.Option.IsString:
			case StringComparison.Option.ContainsString:
			case StringComparison.Option.StartsWithString:
			case StringComparison.Option.EndsWithString:
				return matches > 0
			case StringComparison.Option.IsNotString:
			case StringComparison.Option.DoesNotContainString:
			case StringComparison.Option.DoesNotStartWithString:
			case StringComparison.Option.DoesNotEndWithString:
				return matches === value.length
			default:
				return false
		}
	}
}

const stringCriteriaSchema = {
	compare: new ExtendedStringField({
		required: true,
		nullable: false,
		blank: false,
		choices: StringComparison.OptionsChoices,
		initial: StringComparison.Option.AnyString,
	}),
	qualifier: new ExtendedStringField({ required: true, nullable: false }),
}

type StringCriteriaSchema = typeof stringCriteriaSchema

export { StringCriteriaField, StringCriteria, type StringCriteriaSchema }
