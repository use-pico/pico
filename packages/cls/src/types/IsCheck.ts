/**
 * Type-level utility to combine multiple requirement checks using AND logic
 */
export type IsCheck<TChecks extends readonly boolean[]> =
	TChecks extends readonly [
		infer First,
		...infer Rest,
	]
		? First extends true
			? Rest extends readonly boolean[]
				? IsCheck<Rest>
				: true
			: false
		: true;
