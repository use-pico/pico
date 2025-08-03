/**
 * Fast string hash function (djb2 algorithm)
 * Much faster than SHA-224 for this use case
 */
const fastHash = (str: string): string => {
	let hash = 5381;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) + hash + str.charCodeAt(i);
		hash = hash & hash; // Convert to 32-bit integer
	}
	return Math.abs(hash).toString(36);
};

/**
 * Recursively sorts object properties and array elements for stable hashing.
 * Throws an error if it encounters functions, as they cannot be reliably hashed.
 */
const sortForHash = (input: unknown, path: string = "root"): unknown => {
	if (input === null || input === undefined) {
		return input;
	}

	if (typeof input === "function") {
		throw new Error(
			`hashOf: Cannot hash functions. Functions use reference equality and cannot be reliably hashed.\n` +
				`This usually indicates a dependency issue in useStableCallback/useStableMemo.\n` +
				`Consider extracting the function reference or using local state instead.\n` +
				`Function: ${input.name || "anonymous"} at path: ${path}`,
		);
	}

	if (typeof input !== "object") {
		return input;
	}

	if (Array.isArray(input)) {
		// Recursively sort array elements
		const sortedArray = input
			.map((item, index) => sortForHash(item, `${path}[${index}]`))
			.sort((a, b) => {
				// Convert to strings for comparison
				const aStr = JSON.stringify(a);
				const bStr = JSON.stringify(b);
				return aStr.localeCompare(bStr);
			});
		return sortedArray;
	}

	const sorted: Record<string, unknown> = {};
	for (const key of Object.keys(input).sort()) {
		sorted[key] = sortForHash(
			(input as Record<string, unknown>)[key],
			`${path}.${key}`,
		);
	}

	return sorted;
};

/**
 * Computes a stable hash from an object or array.
 * Sorts object properties and array elements to ensure consistent results
 * regardless of the original order.
 * Uses a fast hash function optimized for this specific use case.
 *
 * ⚠️ **Important**: This function will throw an error if it encounters any functions
 * in the input. Functions use reference equality and cannot be reliably hashed.
 * This is intentional to help developers identify dependency issues in stable hooks.
 *
 * @param input - The input to hash (object, array, or scalar value)
 * @returns A fast hash string
 * @throws {Error} If the input contains any functions
 *
 * @example
 * ```ts
 * // ✅ Works with data
 * hashOf({ a: 1, b: 2 }) // "abc123"
 * hashOf([1, 2, 3]) // "def456"
 *
 * // ❌ Throws with functions
 * hashOf({ fn: () => {} }) // Error: Cannot hash functions... at path: root.fn
 * hashOf([() => {}]) // Error: Cannot hash functions... at path: root[0]
 * hashOf({ config: { handler: () => {} } }) // Error: Cannot hash functions... at path: root.config.handler
 *
 * // Real-world example with fulltext object
 * const fulltext = { value: "test", set: (v) => {} };
 * hashOf(fulltext) // Error: Cannot hash functions... at path: root.set
 * hashOf([fulltext]) // Error: Cannot hash functions... at path: root[0].set
 * ```
 */
export const hashOf = (input: unknown): string => {
	if (input === null) {
		return fastHash("null");
	}

	if (input === undefined) {
		return fastHash("undefined");
	}

	// Generate hash from the sorted input using fast hash function
	return fastHash(JSON.stringify(sortForHash(input)));
};
