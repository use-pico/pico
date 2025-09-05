/**
 * Namespace for general utility types used throughout the CLS system
 */
export namespace Utility {
	/**
	 * Converts the string "bool" to boolean type, otherwise preserves the string type
	 * Used for variant value type mapping where "bool" represents boolean variants
	 */
	export type Value<T extends string> = T extends "bool" ? boolean : T;

	/**
	 * Merges two record types by combining their array values
	 * Used for merging variant contracts in inheritance chains
	 */
	export type Merge<
		A extends Record<string, readonly any[]>,
		B extends Record<string, readonly any[]>,
	> = {
		[K in keyof A | keyof B]: K extends keyof B
			? K extends keyof A
				? [
						...A[K],
						...B[K],
					]
				: B[K]
			: K extends keyof A
				? A[K]
				: never;
	};

	/**
	 * Checks if a contract type has a specific base type in its inheritance chain
	 * Used for validating contract inheritance relationships
	 */
	export type HasBaseInUseChain<Sub, Base> = Sub extends Base
		? true
		: Sub extends {
					"~use"?: infer U;
				}
			? HasBaseInUseChain<U, Base>
			: false;
}
