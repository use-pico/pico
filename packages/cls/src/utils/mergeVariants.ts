import type { Utils } from "../types/Utils";
import type { Variant } from "../types/Variant";

/**
 * Merges two variant objects, combining arrays for duplicate keys.
 * This follows the same merging logic used throughout the CLS system
 * where variant values are accumulated rather than overridden.
 *
 * @template TVariantsA - The first variant object type
 * @template TVariantsB - The second variant object type
 * @param variantsA - The base variant object
 * @param variantsB - The variant object to merge in
 * @returns A merged variant object with combined arrays for duplicate keys
 *
 * @example
 * ```typescript
 * const merged = mergeVariants(
 *   { size: ["sm", "md"] },
 *   { size: ["lg"], tone: ["light", "dark"] }
 * );
 * // Result: { size: ["sm", "md", "lg"], tone: ["light", "dark"] }
 * ```
 */
export function mergeVariants<
	TVariantsA extends Variant.Type,
	TVariantsB extends Variant.Type,
>(
	variantsA: TVariantsA,
	variantsB: TVariantsB,
): Utils.Merge<TVariantsA, TVariantsB> {
	const result = {
		...variantsA,
	} as Record<string, readonly string[]>;

	for (const [key, values] of Object.entries(variantsB)) {
		if (key in result && result[key]) {
			// Merge arrays for existing keys
			result[key] = [
				...result[key],
				...values,
			];
		} else {
			// Add new keys
			result[key] = values;
		}
	}

	return result as Utils.Merge<TVariantsA, TVariantsB>;
}
