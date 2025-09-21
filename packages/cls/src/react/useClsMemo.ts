import { type DependencyList, useMemo } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { clsTweakToken } from "../utils/clsTweakToken";
import { merge } from "../utils/merge";
import { useTokenContext } from "./useTokenContext";
import { useTweakContext } from "./useTweakContext";

/**
 * Memoized version of `useCls` with an explicit dependency list.
 *
 * Combines tweaks in this precedence: user tweak (arg 2) > TweakProvider
 * (context) > internal tweak (arg 3). Tokens from `TokenContext` are merged
 * with internal tokens using `clsTweakToken`, where internal tokens win.
 *
 * @template TContract - CLS contract type defining tokens, slots, and variants
 *
 * @param cls - CLS instance used for slot creation
 * @param userTweak - Optional user-provided tweak object (variant/slot/token/override)
 * @param internalTweak - Optional internal tweak object for component logic
 * @param deps - Dependency list controlling memoization of the created kit
 *
 * @returns A memoized `Cls.Kit<TContract>` with slot functions (e.g., `slots.root()`).
 *
 * @example
 * const slots = useClsMemo(ButtonCls, {
 *   variant: { size: "lg", tone: "primary" },
 * });
 *
 * @example
 * const slots = useClsMemo(
 *   ButtonCls,
 *   { variant: { size, tone } },
 *   { variant: { disabled: disabled || loading } },
 *   [size, tone, disabled, loading],
 * );
 */
export function useClsMemo<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweak?: Tweak.Type<TContract>,
	internalTweak?: Tweak.Type<TContract>,
	deps: DependencyList = [],
): Cls.Kit<TContract> {
	const context = useTokenContext();
	const tweak = useTweakContext();

	return useMemo(
		() =>
			cls.create(
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
			),
		// biome-ignore lint/correctness/useExhaustiveDependencies: User driven
		deps,
	);
}
