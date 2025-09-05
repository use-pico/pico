import type { CreateConfig, WhatUtil } from "../types";
import type { Contract } from "../types/Contract";
import { what } from "./what";

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
	internal: WhatUtil.Value.Any<T> | undefined,
	user: WhatUtil.Value.Any<T> | undefined,
): WhatUtil.Value.Any<T> | undefined {
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
		} as WhatUtil.Value.Any<T>;
	} else if (combinedClasses.length > 0) {
		return {
			class: combinedClasses,
		} as WhatUtil.Value.Any<T>;
	} else if (combinedTokens.length > 0) {
		return {
			token: combinedTokens,
		} as WhatUtil.Value.Any<T>;
	}

	return undefined;
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
	userFn?: WhatUtil.Config.Fn<TContract>,
	internalFn?: WhatUtil.Config.Fn<TContract>,
): () => Partial<CreateConfig<TContract>> {
	const $user = userFn?.(what());
	const $internal = internalFn?.(what());

	return () => ({
		...($internal ?? {}),
		...($user ?? {}),
		variant: {
			...filter($internal?.variant),
			...filter($user?.variant),
		} as Partial<CreateConfig<TContract>["variant"]>,
		slot: (() => {
			const internalSlot = $internal?.slot;
			const userSlot = $user?.slot;

			if (!internalSlot && !userSlot) {
				return undefined;
			}
			if (!internalSlot) {
				return userSlot;
			}
			if (!userSlot) {
				return internalSlot;
			}

			// Combine slots by merging What objects for each slot
			const combinedSlot: any = {};
			const allSlotKeys = new Set([
				...Object.keys(internalSlot),
				...Object.keys(userSlot),
			]);

			for (const slotKey of allSlotKeys) {
				combinedSlot[slotKey] = combineWhat(
					internalSlot[slotKey as keyof typeof internalSlot],
					userSlot[slotKey as keyof typeof userSlot],
				);
			}

			return combinedSlot;
		})(),
		override: {
			...$internal?.override,
			...$user?.override,
		} as Partial<CreateConfig<TContract>["override"]>,
		token: {
			...$internal?.token,
			...$user?.token,
		} as Partial<CreateConfig<TContract>["token"]>,
	});
}
