import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { clsTweakToken } from "../utils/clsTweakToken";
import { merge } from "../utils/merge";
import { useTokenContext } from "./useTokenContext";
import { useTweakContext } from "./useTweakContext";

/**
 * React hook to create a CLS kit from a cls instance, merging tweaks and token context.
 *
 * Precedence:
 * - user tweak (arg 2) wins over
 * - TweakProvider (context) which wins over
 * - internal tweak (arg 3)
 *
 * Tokens:
 * - Tokens from `TokenContext` are merged with `internalTweak.token` via `clsTweakToken`
 *   and internal tokens win over context tokens.
 *
 * @template TContract - CLS contract type
 * @param cls - CLS instance to create kit from
 * @param userTweak - Optional user-provided tweak (variant/slot/token/override)
 * @param internalTweak - Optional internal tweak for component logic
 * @returns A `Cls.Kit<TContract>` with slot functions (e.g., `slots.root()`).
 */
export function useCls<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweak?: Tweak.Type<TContract>,
	internalTweak?: Tweak.Type<TContract>,
) {
	const context = useTokenContext();
	const tweak = useTweakContext();

	return cls.create(
		/**
		 * Again, a little lie here, but it may overall work.
		 */
		merge<TContract>(userTweak, tweak as Tweak.Type<TContract>),
		clsTweakToken<TContract>(
			/**
			 * This is a lie, but because CLS is quite flexible, it does not really matter.
			 *
			 * Overall, it's much simpler to use "general" context than connect also all components
			 * using custom "cls".
			 */
			context as Cls.Type<TContract>,
			internalTweak,
		),
	);
}
