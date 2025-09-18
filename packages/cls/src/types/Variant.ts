import type { Contract } from "./Contract";
import type { Utils } from "./Utils";

/**
 * Namespace for variant-related types and utilities
 */
export namespace Variant {
	/**
	 * Base variant contract type that defines the structure of variant names and their allowed values
	 */
	export type Type = Record<string, readonly string[]>;

	/**
	 * Extracts all variants from inheritance chain and builds merged result of the chain,
	 * providing variant name as property and values are all available variants.
	 * This is raw input (no value translation done).
	 *
	 * This utility type recursively traverses the inheritance chain (via the "~use" property)
	 * and merges all variant contracts into a single, flattened variant contract. The result
	 * contains the raw variant definitions as they were declared, without any value type
	 * transformations.
	 *
	 * @template TContract - The contract type to extract variants from
	 * @returns A merged variant contract containing all variants from the inheritance chain
	 */
	export type Raw<TContract extends Contract.Any> = TContract extends {
		variant: infer V extends Type;
		"~use"?: infer U;
	}
		? U extends Contract.Any
			? Utils.Merge<Raw<U>, V>
			: V
		: Record<string, never>;

	/**
	 * Check if any variants are present in the contract only
	 */
	export type Has<TContract extends Contract.Any> =
		keyof TContract["variant"] extends never ? false : true;

	/**
	 * Check if any variants are present in the inheritance chain
	 */
	export type With<TContract extends Contract.Any> =
		keyof Raw<TContract> extends never ? false : true;

	/**
	 * Extracts all variants from inheritance chain and builds an object with "bool" variants
	 * translated to literal booleans and values mapped to individual object properties.
	 *
	 * This utility type recursively traverses the inheritance chain to collect all variant
	 * definitions, then creates a type-safe object where each variant name becomes a property
	 * with its corresponding value type. Boolean variants (defined with "bool") are mapped
	 * to the `boolean` type, while other variants are mapped to their string literal union types.
	 *
	 * @template TContract - The contract type to extract variant value mappings from
	 * @returns A mapping of variant names to their resolved value types
	 */
	export type VariantOf<TContract extends Contract.Any> = {
		[K in keyof Raw<TContract>]: Utils.Value<Raw<TContract>[K][number]>;
	};

	export type Required<TContract extends Contract.Any> =
		With<TContract> extends false
			? Record<string, never>
			: VariantOf<TContract>;

	export type Optional<TContract extends Contract.Any> =
		With<TContract> extends false
			? Record<string, never>
			: Partial<VariantOf<TContract>>;

	export type RequiredFn<TContract extends Contract.Any> = (
		variant: Required<TContract>,
	) => Required<TContract>;

	export type OptionalFn<TContract extends Contract.Any> = (
		variant: Optional<TContract>,
	) => Optional<TContract>;
}
