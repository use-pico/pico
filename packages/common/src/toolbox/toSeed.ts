/**
 * Primitive string -> number hashing function.
 */
export const toSeed = (input: string): number => {
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		hash = (hash << 5) - hash + input.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
};
