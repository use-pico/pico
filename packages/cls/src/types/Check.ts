/**
 * Namespace for type-level conditional checks
 */
export namespace Check {
	/**
	 * Type-level utility to check if a condition is met
	 */
	export type If<
		TRequired extends boolean,
		TFulfilled extends boolean | undefined,
	> = TRequired extends true
		? TFulfilled extends true
			? true
			: false
		: true;

	/**
	 * Type-level utility to check if ALL requirements in an array are true (AND logic)
	 */
	export type Each<TChecks extends readonly boolean[]> =
		TChecks extends readonly [
			infer First,
			...infer Rest,
		]
			? First extends true
				? Rest extends readonly boolean[]
					? Each<Rest>
					: true
				: false
			: true;

	/**
	 * Type-level utility to check if ANY requirement in an array is true (OR logic)
	 */
	export type Some<TChecks extends readonly boolean[]> =
		TChecks extends readonly [
			infer First,
			...infer Rest,
		]
			? First extends true
				? true // If first is true, return true immediately (OR logic)
				: Rest extends readonly boolean[]
					? Some<Rest> // Continue checking remaining items
					: false
			: false; // Empty array returns false
}
