import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { filter } from "./filter";

/**
 * merge(tweak1, tweak2, ...)
 *
 * Merges multiple tweak objects with specific behavior:
 * - Variants are replaced by default (regardless of "override" flag)
 * - Slots are merged by default until override is explicitly set
 * - Tokens are merged until some tweak has override: true, then that tweak resets and starts over
 * - Override flag only affects slots/tokens explicitly set, not the whole tweak
 */
export function tweaks<const TContract extends Contract.Any>(
	...tweaks: Tweak.Tweaks<TContract>[]
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
			const variant = filter(current.variant);
			const slot = filter(current.slot);
			const token = filter(current.token);
			const override = current.override;

			return {
				token: {
					...token,
					...filter(root.token),
				},
				slot: {
					...slot,
					...filter(root.slot),
				},
				variant: {
					...variant,
					...filter(root.variant),
				},
			} as Tweak.Type<TContract>;
		}, root);
}
