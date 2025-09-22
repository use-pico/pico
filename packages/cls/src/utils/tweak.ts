import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { filter } from "./filter";

export namespace tweak {
	export type Tweaks<TContract extends Contract.Any> =
		| (Tweak.Type<TContract> | undefined)[]
		| undefined;
}

/**
 * merge(user, internal)
 *
 * Merges two CreateConfig objects of the same contract type.
 * - Field-level precedence: user wins over internal (variant, slot, override, token)
 * - Shallow merge per field to match cls.create() semantics
 * - Slots are combined by appending What objects, not overriding them
 */
export function tweak<const TContract extends Contract.Any>(
	...tweaks: tweak.Tweaks<TContract>[]
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
