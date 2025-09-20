import type { Contract } from "./Contract";
import type { Rule } from "./Rule";
import type { Token } from "./Token";
import type { Variant } from "./Variant";

/**
 * Namespace for definition-related types and utilities
 */
export namespace Definition {
	/**
	 * Complete styling definition that provides concrete values for a CLS contract.
	 *
	 * This type represents the implementation of a CLS contract, containing all the
	 * styling values, rules, and defaults that determine how a component is actually
	 * styled. It's returned by definition functions and used internally by CLS instances
	 * to generate styled components.
	 *
	 * @template T - The contract type that defines the structure (tokens, slots, variants)
	 */
	export type Type<T extends Contract.Any> = {
		token: Token.Required<T>;
		rules: Rule.Type<T>[];
		defaults: Variant.VariantOf<T>;
	};

	export namespace Def {
		export interface Type<TContract extends Contract.Any> {
			root: Rule.Match.RootFn<TContract>;
			rule: Rule.Match.RuleFn<TContract>;
			token: Token.RequiredFn<TContract>;
			defaults: Variant.RequiredFn<TContract>;
		}
	}
}
