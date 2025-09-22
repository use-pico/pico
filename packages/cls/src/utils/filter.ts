/**
 * Filters out undefined values from an object
 */
export function filter<T extends Record<string, any>>(
	input: T | undefined,
): Partial<T> {
	if (!input) {
		return {};
	}

	const result: Partial<T> = {};
	for (const [key, value] of Object.entries(input)) {
		if (value !== undefined) {
			result[key as keyof T] = value;
		}
	}
	return result;
}
