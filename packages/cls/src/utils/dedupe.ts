/**
 * Runtime deduplication utility that maintains type compatibility
 * with the type-level deduplication
 */
export function dedupe<T extends readonly any[]>(arr: T): T {
	const seen = new Set();
	const result: any[] = [];

	for (const item of arr) {
		if (!seen.has(item)) {
			seen.add(item);
			result.push(item);
		}
	}

	return result as unknown as T;
}

/**
 * Concatenates and deduplicates two arrays
 */
export function dedupeConcat<
	A extends readonly any[],
	B extends readonly any[],
>(
	a: A,
	b: B,
): readonly [
	...A,
	...B,
] {
	const combined = [
		...a,
		...b,
	];
	const seen = new Set();
	const result: any[] = [];

	for (const item of combined) {
		if (!seen.has(item)) {
			seen.add(item);
			result.push(item);
		}
	}

	return result as unknown as readonly [
		...A,
		...B,
	];
}
