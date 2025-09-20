import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";

/**
 * Just type-safe helper to return tweak, useful for "abstract" TweakContext to hold-up
 * right types.
 */
export const tweak = <const TContract extends Contract.Any>(
	_: Cls.Type<TContract>,
	tweak: Tweak.Type<TContract>,
) => {
	return tweak;
};
