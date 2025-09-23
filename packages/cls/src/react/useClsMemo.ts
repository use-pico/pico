import { type DependencyList, useMemo } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import type { Variant } from "../types/Variant";
import { useTokenContext } from "./useTokenContext";
import { useVariantContext } from "./useVariantContext";

/**
 * Memoized version of `useCls` with explicit dependency control for performance optimization.
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
 * **Memoization Control:**
 * - Uses `useMemo` with the provided dependency list
 * - Recreates the CLS kit only when dependencies change
 * - Essential for performance when tweaks depend on props or state
 *
 * **Tweak Merging:**
 * - Uses the `tweaks()` function with parameter-based syntax
 * - User tweak takes precedence over context values
 * - Undefined values are automatically filtered out
 *
 * @template TContract - CLS contract type defining tokens, slots, and variants
 * @param cls - CLS instance to create kit from
 * @param tweaks - Optional user-provided tweak (variant/slot/token/override)
 * @param deps - Dependency list controlling memoization (defaults to empty array)
 * @returns A memoized `Cls.Kit<TContract>` with slot functions (e.g., `slots.root()`) and resolved variants
 *
 * @example
 * ```tsx
 * // Basic usage with memoization based on props
 * const { slots, variant } = useClsMemo(
 *   ButtonCls,
 *   { variant: { size, tone } },
 *   [size, tone] // Re-memoize when size or tone changes
 * );
 * ```
 *
 * @example
 * ```tsx
 * // Complex tweak with multiple dependencies
 * const { slots, variant } = useClsMemo(
 *   ButtonCls,
 *   {
 *     variant: { size, tone, disabled },
 *     slot: { root: { class: disabled ? ["opacity-50"] : [] } }
 *   },
 *   [size, tone, disabled] // Re-memoize when any dependency changes
 * );
 * ```
 *
 * @example
 * ```tsx
 * // No user tweak - memoizes context-only result
 * const { slots, variant } = useClsMemo(
 *   ButtonCls,
 *   undefined,
 *   [] // Never re-memoize (context changes handled internally)
 * );
 * ```
 */
export function useClsMemo<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	tweaks?: Tweak.Tweaks<TContract>,
	deps: DependencyList = [],
): Cls.Kit<TContract> {
	const context = useTokenContext();
	const variant = useVariantContext() as Variant.Optional<TContract>;

	return useMemo(
		() =>
			cls.create(
				tweaks,
				/**
				 * Context tweak has lowest priority
				 */
				{
					token: context,
					variant,
				},
			),
		// biome-ignore lint/correctness/useExhaustiveDependencies: User driven
		deps,
	);
}
