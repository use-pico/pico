/**
 * Deduplicates items in an array while preserving tuple/readonly types.
 */
export const dedupe = <T extends readonly unknown[]>(arr: T): T => {
	const seen = new Set<unknown>();
	const result: unknown[] = [];

	for (const item of arr) {
		if (!seen.has(item)) {
			seen.add(item);
			result.push(item);
		}
	}

	return result as unknown as T;
};
