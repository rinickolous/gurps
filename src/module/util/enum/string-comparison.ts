import { i18n } from "@util/i18n.ts"

export namespace StringComparison {
	export enum Option {
		AnyString = "none",
		IsString = "is",
		IsNotString = "is_not",
		ContainsString = "contains",
		DoesNotContainString = "does_not_contain",
		StartsWithString = "starts_with",
		DoesNotStartWithString = "does_not_start_with",
		EndsWithString = "ends_with",
		DoesNotEndWithString = "does_not_end_with",
	}

	/* -------------------------------------------- */

	export function compare(compare: Option, val1: string, val2: string): boolean {
		val1 = val1.toLowerCase()
		val2 = val2.toLowerCase()
		switch (compare) {
			case Option.AnyString:
				return true
			case Option.IsString:
				return val1 === val2
			case Option.IsNotString:
				return val1 !== val2
			case Option.ContainsString:
				return val1.includes(val2.toLowerCase())
			case Option.DoesNotContainString:
				return !val1.includes(val2.toLowerCase())
			case Option.StartsWithString:
				return val1.startsWith(val2.toLowerCase())
			case Option.DoesNotStartWithString:
				return !val1.startsWith(val2.toLowerCase())
			case Option.EndsWithString:
				return val1.endsWith(val2.toLowerCase())
			case Option.DoesNotEndWithString:
				return !val1.endsWith(val2.toLowerCase())
			default:
				return false
		}
	}

	/* -------------------------------------------- */

	export const Options: Option[] = [
		Option.AnyString,
		Option.IsString,
		Option.IsNotString,
		Option.ContainsString,
		Option.DoesNotContainString,
		Option.StartsWithString,
		Option.DoesNotStartWithString,
		Option.EndsWithString,
		Option.DoesNotEndWithString,
	]

	/* -------------------------------------------- */

	export const OptionsChoices: Readonly<Record<Option, string>> = Object.freeze(
		Object.fromEntries(
			Options.map(option => [option, i18n.localize(`GURPS.Enum.StringComparison.${option}`)])
		) as Record<Option, string>
	)
}
