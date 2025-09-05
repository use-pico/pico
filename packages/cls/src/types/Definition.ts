import type { WhatUtil } from "../types";
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

	/**
	 * Function type for creating CLS definitions.
	 *
	 * This function type defines the signature for definition functions that receive
	 * a WhatUtil object and return a complete Definition object. It's used when
	 * creating CLS instances to provide type-safe styling definitions.
	 *
	 * @template TContract - The contract type that defines the structure (tokens, slots, variants)
	 * @param props - WhatUtil object providing styling helpers
	 * @returns A complete Definition object for the contract
	 */
	export type Fn<TContract extends Contract.Any> = (
		props: WhatUtil<TContract>,
	) => Type<TContract>;
}
