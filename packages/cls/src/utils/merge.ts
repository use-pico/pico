import type { Contract } from "../types/Contract";
import type { Slot } from "../types/Slot";
import type { Token } from "../types/Token";
import type { Tweak } from "../types/Tweak";
import type { Variant } from "../types/Variant";
import type { What } from "../types/What";

// Callbacks removed: no runtime utils needed here

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
 * Combines two What objects by merging their class and token arrays
 */
function combineWhat<T extends Contract.Any>(
	internal: What.Any<T> | undefined,
	user: What.Any<T> | undefined,
): What.Any<T> | undefined {
	if (!internal && !user) {
		return undefined;
	}
	if (!internal) {
		return user;
	}
	if (!user) {
		return internal;
	}

	// Combine class arrays
	const internalClasses = "class" in internal ? internal.class : [];
	const userClasses = "class" in user ? user.class : [];
	const combinedClasses = [
		...(Array.isArray(internalClasses)
			? internalClasses
			: [
					internalClasses,
				]),
		...(Array.isArray(userClasses)
			? userClasses
			: [
					userClasses,
				]),
	];

	// Combine token arrays
	const internalTokens = "token" in internal ? internal.token : [];
	const userTokens = "token" in user ? user.token : [];
	const combinedTokens = [
		...(Array.isArray(internalTokens)
			? internalTokens
			: [
					internalTokens,
				]),
		...(Array.isArray(userTokens)
			? userTokens
			: [
					userTokens,
				]),
	];

	// Create result based on what we have
	if (combinedClasses.length > 0 && combinedTokens.length > 0) {
		return {
			class: combinedClasses,
			token: combinedTokens,
		} as What.Any<T>;
	} else if (combinedClasses.length > 0) {
		return {
			class: combinedClasses,
		} as What.Any<T>;
	} else if (combinedTokens.length > 0) {
		return {
			token: combinedTokens,
		} as What.Any<T>;
	}

	return undefined;
}

export namespace merge {
	export type Tweaks<TContract extends Contract.Any> = [
		Tweak.Type<TContract>,
		...(Tweak.Type<TContract> | undefined)[],
	];
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
	tweaks: merge.Tweaks<TContract>,
): Tweak.Type<TContract> {
	return tweaks.filter(Boolean).reduceRight<Tweak.Type<TContract>>(
		(acc, primaryCurrent) => {
			const primary = primaryCurrent ?? {};
			const secondary = acc ?? {};

			return {
				...secondary,
				...primary,
				variant: {
					...filter(secondary.variant),
					...filter(primary.variant),
				} as Variant.Optional<TContract>,
				slot: (() => {
					if (!secondary.slot && !primary.slot) {
						return undefined;
					}
					if (!secondary.slot) {
						return primary.slot;
					}
					if (!primary.slot) {
						return secondary.slot;
					}

					// Combine slots by merging What objects for each slot
					const slots: Record<
						string,
						What.Any<TContract> | undefined
					> = {};
					const keys = new Set([
						...Object.keys(secondary.slot),
						...Object.keys(primary.slot),
					]);

					for (const slotKey of keys) {
						slots[slotKey] = combineWhat(
							secondary.slot[
								slotKey as keyof Slot.Optional<TContract>
							],
							primary.slot[
								slotKey as keyof Slot.Optional<TContract>
							],
						);
					}

					return slots;
				})(),
				override: {
					...secondary.override,
					...primary.override,
				} as Slot.Optional<TContract>,
				token: {
					...secondary.token,
					...primary.token,
				} as Token.Optional<TContract>,
			};
		},
		{} as Tweak.Type<TContract>,
	);
}
