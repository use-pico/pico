import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";

/**
 * Returns an internal tweak function that merges context tokens with the
 * internal tweak config. Internal tokens win over context tokens.
 */
export function clsTweakToken<TContract extends Contract.Any>(
	cls: Cls.Type<TContract> | undefined,
	tweak?: Tweak.Type<TContract>,
): Tweak.Type<TContract> | undefined {
	if (cls?.definition?.token) {
		return {
			...tweak,
			token: {
				...cls.definition.token,
				...tweak?.token, // Internal tokens win over context tokens
			},
		};
	}

	return tweak;
}
