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
export function merge<const TContract extends Contract.Any>(
	...tweaks: ((Tweak.Type<TContract> | undefined)[] | undefined)[]
): Tweak.Type<TContract> {
	if (!tweaks || tweaks.length === 0) {
		return {};
	}

	const list = tweaks
		.flat()
		.filter((tweak): tweak is Tweak.Type<TContract> => tweak !== undefined);

	if (list.length === 0) {
		return {};
	}

	const [root, ...rest] = list as [
		Tweak.Type<TContract>,
		...Tweak.Type<TContract>[],
	];

	return rest
		.filter((tweak): tweak is Tweak.Type<TContract> => tweak !== undefined)
		.reduce((root, current) => {
			return {
				token: {
					...filter(current.token),
					...filter(root.token),
				},
				slot: {
					...filter(current.slot),
					...filter(root.slot),
				},
				override: {
					...filter(current.override),
					...filter(root.override),
				},
				variant: {
					...filter(current.variant),
					...filter(root.variant),
				},
			} as Tweak.Type<TContract>;
		}, root);
}
