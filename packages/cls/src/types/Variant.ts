import type { Contract } from "./Contract";
import type { Utility } from "./utility";

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
	 * @template T - The contract type to extract variants from
	 * @returns A merged variant contract containing all variants from the inheritance chain
	 */
	export type Extract<T extends Contract.Any> = T extends {
		variant: infer V extends Type;
		"~use"?: infer U;
	}
		? U extends Contract.Any
			? Utility.Merge<Extract<U>, V>
			: V
		: Record<string, never>;

	/**
	 * Checks if a contract has any variants declared in its inheritance chain.
	 *
	 * This utility type determines whether a contract (or any of its parent contracts)
	 * has any variant declarations. It's used to conditionally apply variant-related
	 * type constraints and ensure type safety when working with optional variant systems.
	 *
	 * @template T - The contract type to check for variants
	 * @returns `true` if the contract has variants, `false` if it has no variants
	 */
	export type HasVariants<T extends Contract.Any> =
		keyof Extract<T> extends never ? false : true;

	/**
	 * Extracts all variants from inheritance chain and builds an object with "bool" variants
	 * translated to literal booleans and values mapped to individual object properties.
	 *
	 * This utility type recursively traverses the inheritance chain to collect all variant
	 * definitions, then creates a type-safe object where each variant name becomes a property
	 * with its corresponding value type. Boolean variants (defined with "bool") are mapped
	 * to the `boolean` type, while other variants are mapped to their string literal union types.
	 *
	 * @template T - The contract type to extract variant value mappings from
	 * @returns A mapping of variant names to their resolved value types
	 */
	export type VariantOf<T extends Contract.Any> = {
		[K in keyof Extract<T>]: Utility.Value<Extract<T>[K][number]>;
	};

	export type Required<T extends Contract.Any> = HasVariants<T> extends false
		? Record<string, never>
		: VariantOf<T>;

	export type Optional<T extends Contract.Any> = HasVariants<T> extends false
		? Record<string, never>
		: Partial<VariantOf<T>>;

	export type RequiredFn<T extends Contract.Any> = (
		variant: Required<T>,
	) => Required<T>;

	export type OptionalFn<T extends Contract.Any> = (
		variant: Optional<T>,
	) => Optional<T>;
}
