import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import type { Variant } from "../types/Variant";
import { useTokenContext } from "./useTokenContext";
import { useVariantContext } from "./useVariantContext";

/**
 * React hook to create a CLS kit from a cls instance, merging user tweaks with context.
 *
 * **Tweak Precedence (highest to lowest):**
 * 1. **User tweak** - Direct user customization passed as parameter
 * 2. **Context tweak** - Automatically merged from TokenContext and VariantContext
 *
 * **Context Integration:**
 * - Automatically subscribes to `TokenContext` for token overrides
 * - Automatically subscribes to `VariantContext` for variant overrides
 * - Context values have lower precedence than user-provided tweaks
 *
 * **Tweak Merging:**
 * - Uses the `tweaks()` function with parameter-based syntax
 * - User tweak takes precedence over context values
 * - Undefined values are automatically filtered out
 *
 * @template TContract - CLS contract type defining tokens, slots, and variants
 * @param cls - CLS instance to create kit from
 * @param tweaks - Optional user-provided tweak (variant/slot/token/override)
 * @returns A `Cls.Kit<TContract>` with slot functions (e.g., `slots.root()`) and resolved variants
 *
 * @example
 * ```tsx
 * // Basic usage with user tweak
 * const { slots, variant } = useCls(ButtonCls, {
 *   variant: { size: "lg", tone: "primary" },
 *   slot: { root: { class: ["font-bold"] } }
 * });
 * ```
 *
 * @example
 * ```tsx
 * // Without user tweak - uses context only
 * const { slots, variant } = useCls(ButtonCls);
 * ```
 *
 * @example
 * ```tsx
 * // User tweak overrides context values
 * const { slots, variant } = useCls(ButtonCls, {
 *   variant: { size: "sm" } // Overrides context variant.size
 * });
 * ```
 */
export function useCls<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	...tweaks: Tweak.Tweaks<TContract>[]
) {
	const context = useTokenContext();
	const variant = useVariantContext() as Variant.Optional<TContract>;

	return cls.create(
		...tweaks,
		/**
		 * Context tweak has lowest priority
		 */
		{
			token: context,
			variant,
		},
	);
}
