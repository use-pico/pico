import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Variant } from "../types/Variant";
import { tweak } from "../utils/tweak";
import { useTokenContext } from "./useTokenContext";
import { useVariantContext } from "./useVariantContext";

/**
 * React hook to create a CLS kit from a cls instance, merging tweaks and token context.
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
 * @param cls - CLS instance to create kit from
 * @param userTweak - Optional user-provided tweak (variant/slot/token/override)
 * @param internalTweak - Optional internal tweak for component logic
 * @param use - Array controlling context subscription: "token" for TokenContext, "tweak" for TweakProvider
 * @returns A `Cls.Kit<TContract>` with slot functions (e.g., `slots.root()`) and resolved variants
 *
 * @example
 * ```tsx
 * // Default usage - subscribes to TokenContext only
 * const { slots, variants } = useCls(ButtonCls, tweak);
 *
 * @example
 * ```tsx
 * // Subscribe to both contexts
 * const { slots, variants } = useCls(ButtonCls, tweak, internal, ["token", "tweak"]);
 *
 * @example
 * ```tsx
 * // Isolated component - not affected by any context
 * const { slots, variants } = useCls(ButtonCls, tweak, internal, []);
 * ```
 */
export function useCls<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	tweaks?: tweak.Tweaks<TContract>,
) {
	const context = useTokenContext();
	const variant = useVariantContext() as Variant.Optional<TContract>;

	return cls.create(
		tweak<TContract>(tweaks, [
			/**
			 * Context tweak has lowest priority
			 */
			{
				token: context,
				variant,
			},
		]),
	);
}
