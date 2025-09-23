import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import type { What } from "../types/What";
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

	return rest.reduce((acc, current) => {
		const override = current.override ?? false;

		return {
			token: merge(acc.token ?? {}, current.token ?? {}, override),
			slot: merge(acc.slot ?? {}, current.slot ?? {}, override),
			variant: {
				...filter(acc.variant),
				...filter(current.variant),
			},
		} as Tweak.Type<TContract>;
	}, root);
}

const merge = (
	acc: Record<string, What.Any<Contract.Any> | undefined>,
	current: Record<string, What.Any<Contract.Any> | undefined>,
	override: boolean,
): Record<string, What.Any<Contract.Any>> => {
	const result = filter({
		...acc,
	});

	Object.entries(filter(current)).forEach(([key, value]) => {
		if (!value) {
			return;
		}

		if (override) {
			result[key] = value;
			return;
		}

		if (!result[key]) {
			result[key] = value;
			return;
		}

		if ("class" in result[key] && "class" in value) {
			result[key].class = [
				result[key].class,
				value.class,
			];
		}

		if ("token" in result[key] && "token" in value) {
			result[key].token = [
				...result[key].token,
				...value.token,
			];
		}
	});

	return result as Record<string, What.Any<Contract.Any>>;
};
