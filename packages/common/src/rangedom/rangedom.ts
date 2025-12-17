/**
 * Generates a random integer within the inclusive range defined by `min` and `max`.
 *
 * @param min - Lower bound of the range.
 * @param max - Upper bound of the range.
 * @returns A random integer between `min` and `max`, inclusive.
 */
export function rangedom(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
