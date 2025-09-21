import { type DependencyList, useMemo } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { clsTweakToken } from "../utils/clsTweakToken";
import { merge } from "../utils/merge";
import { useTokenContext } from "./useTokenContext";
import { useVariantContext } from "./useVariantContext";

/**
 * Memoized version of `useCls` with an explicit dependency list.
 *
 * **Tweak Precedence (highest to lowest):**
 * 1. **User tweak** (arg 2) - Direct user customization
 * 2. **TweakProvider context** - Scoped tweak overrides
 * 3. **Internal tweak** (arg 3) - Component logic
 *
 * **Token Merging:**
 * - Tokens from `TokenContext` are merged with `internalTweak.token` via `clsTweakToken`
 * - Internal tokens win over context tokens on conflicts
 *
 * **Context Subscription Control:**
 * - Use `use` parameter to control which contexts the component subscribes to
 * - `["token"]` (default) - Subscribe to TokenContext only
 * - `["tweak"]` - Subscribe to TweakProvider only
 * - `["token", "tweak"]` - Subscribe to both contexts
 * - `[]` - Subscribe to neither (isolated component)
 *
 * @template TContract - CLS contract type defining tokens, slots, and variants
 * @param cls - CLS instance used for slot creation
 * @param userTweak - Optional user-provided tweak object (variant/slot/token/override)
 * @param internalTweak - Optional internal tweak object for component logic
 * @param deps - Dependency list controlling memoization of the created kit
 * @param use - Array controlling context subscription: "token" for TokenContext, "tweak" for TweakProvider
 * @returns A memoized `Cls.Kit<TContract>` with slot functions (e.g., `slots.root()`) and resolved variants
 *
 * @example
 * ```tsx
 * // Default usage - subscribes to TokenContext only
 * const { slots, variant } = useClsMemo(ButtonCls, tweak, internal, [size, tone]);
 * ```
 *
 * @example
 * ```tsx
 * // Subscribe to both contexts with memoization
 * const { slots, variant } = useClsMemo(
 *   ButtonCls,
 *   { variant: { size, tone } },
 *   { variant: { disabled: disabled || loading } },
 *   [size, tone, disabled, loading],
 *   ["token", "tweak"]
 * );
 * ```
 *
 * @example
 * ```tsx
 * // Isolated component - not affected by any context
 * const { slots, variants } = useClsMemo(ButtonCls, tweak, internal, deps, []);
 * ```
 */
export function useClsMemo<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweak?: Tweak.Type<TContract>,
	internalTweak?: Tweak.Type<TContract>,
	deps: DependencyList = [],
): Cls.Kit<TContract> {
	const context = useTokenContext();
	const tweak = useVariantContext();

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
