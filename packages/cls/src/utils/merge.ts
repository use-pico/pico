import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";

/**
 * Filters out undefined values from an object
 */
function filter<T extends Record<string, any>>(
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

/**
 * merge(user, internal)
 *
 * Merges two CreateConfig objects of the same contract type.
 * - Field-level precedence: user wins over internal (variant, slot, override, token)
 * - Shallow merge per field to match cls.create() semantics
 * - Slots are combined by appending What objects, not overriding them
 */
export function merge<const TContract extends Contract.Any>([
	root,
	...tweaks
]: Tweak.Tweaks<TContract>): Tweak.Type<TContract> {
	return tweaks
		.filter((tweak): tweak is Tweak.Type<TContract> => tweak !== undefined)
		.reduce((root, current) => {
			const tweak = filter(current);
			return {
				token: {
					...tweak.token,
					...root.token,
				},
				slot: {
					...tweak.slot,
					...root.slot,
				},
				override: {
					...tweak.override,
					...root.override,
				},
				variant: {
					...tweak.variant,
					...root.variant,
				},
			} as Tweak.Type<TContract>;
		}, root);
}
