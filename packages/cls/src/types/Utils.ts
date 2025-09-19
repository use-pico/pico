/**
 * Namespace for general utility types used throughout the CLS system
 */
export namespace Utils {
	/**
	 * Converts the string "bool" to boolean type, otherwise preserves the string type
	 * Used for variant value type mapping where "bool" represents boolean variants
	 */
	export type Value<T extends string> = T extends "bool" ? boolean : T;

	/**
	 * Utility type to deduplicate array elements at the type level
	 */
	export type Dedupe<T extends readonly any[]> = T extends readonly [
		infer Head,
		...infer Tail,
	]
		? Head extends Tail[number]
			? Dedupe<Tail>
			: [
					Head,
					...Dedupe<Tail>,
				]
		: [];

	/**
	 * Merges two arrays and deduplicates the result
	 */
	export type DedupeConcat<
		A extends readonly any[],
		B extends readonly any[],
	> = Dedupe<
		[
			...A,
			...B,
		]
	>;

	/**
	 * Merges two record types by combining their array values with deduplication
	 * Used for merging variant contracts in inheritance chains
	 */
	export type Merge<
		A extends Record<string, readonly any[]>,
		B extends Record<string, readonly any[]>,
	> = {
		[K in keyof A | keyof B]: K extends keyof B
			? K extends keyof A
				? Dedupe<
						[
							...A[K],
							...B[K],
						]
					>
				: B[K]
			: K extends keyof A
				? A[K]
				: never;
	};
}
