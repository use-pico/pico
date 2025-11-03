export namespace diffOf {
	export type Type = (string | number)[];
}

/**
 * Returns elements that are in the first array but not in the second array.
 *
 * This function calculates the difference between two arrays by filtering out
 * elements from the first array (`alfa`) that are present in the second array (`beta`).
 *
 * @param alfa - The source array to filter from
 * @param beta - The array whose elements should be excluded from the result
 * @returns A new array containing elements from `alfa` that are not in `beta`
 *
 * @example
 * ```ts
 * diffOf([1, 2, 3, 4], [2, 4]) // Returns [1, 3]
 * diffOf(['a', 'b', 'c'], ['b']) // Returns ['a', 'c']
 * ```
 */
export const diffOf = (alfa: diffOf.Type, beta: diffOf.Type): diffOf.Type =>
	alfa.filter((x) => !beta.includes(x));
