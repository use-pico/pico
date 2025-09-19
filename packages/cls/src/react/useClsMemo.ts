import { type DependencyList, useMemo } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Slot } from "../types/Slot";
import type { Tweak } from "../types/Tweak";
import { tweakWithContextToken } from "./tweakWithContextToken";
import { useClsContext } from "./useClsContext";

/**
 * Memoized version of `useCls` that optimizes performance by memoizing the CLS slot creation.
 *
 * This hook provides the same functionality as `useCls` but with performance optimizations
 * for scenarios where the CLS configuration doesn't change frequently. It's particularly
 * useful for components that receive stable props or when you want to prevent unnecessary
 * re-computations of CLS slots.
 *
 * @template TContract - The CLS contract type that defines the structure of tokens, slots, and variants
 *
 * @param cls - The CLS instance to use for slot creation
 * @param userTweakFn - Optional user-provided tweak function for runtime customization.
 *                      This function receives `what` and `override` utilities and should return
 *                      a configuration object with variant, slot, token, or override properties.
 * @param internalTweakFn - Optional internal tweak function for component-controlled logic.
 *                          This is typically used for component-internal variant computation
 *                          (e.g., disabled state based on loading + disabled props).
 *
 * @returns A memoized CLS slots object with slot functions (e.g., `slots.root()`, `slots.label()`)
 *          that return computed class strings based on the current configuration.
 *
 * @example
 * ```tsx
 * // Basic usage with memoization
 * const slots = useClsMemo(ButtonCls, ({ what }) => ({
 *   variant: what.variant({ size: "lg", tone: "primary" })
 * }));
 *
 * // With user and internal tweak functions
 * const slots = useClsMemo(
 *   ButtonCls,
 *   userTweak, // User customization from props
 *   ({ what }) => ({ // Internal component logic
 *     variant: what.variant({
 *       disabled: disabled || loading // Component-controlled state
 *     })
 *   })
 * );
 *
 * // Use in JSX
 * return (
 *   <button className={slots.root()}>
 *     <span className={slots.label()}>Click me</span>
 *   </button>
 * );
 * ```
 *
 * @example
 * ```tsx
 * // Performance optimization example
 * const MyButton = ({ size, tone, disabled, loading }) => {
 *   // This will only recompute when size, tone, disabled, or loading change
 *   const slots = useClsMemo(
 *     ButtonCls,
 *     ({ what }) => ({
 *       variant: what.variant({ size, tone }),
 *       slot: what.slot({
 *         root: what.css(["transition-all", "duration-200"])
 *       })
 *     }),
 *     ({ what }) => ({
 *       variant: what.variant({ disabled: disabled || loading })
 *     })
 *   );
 *
 *   return <button className={slots.root()}>Button</button>;
 * };
 * ```
 */
export function useClsMemo<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweakFn?: Tweak.Fn<TContract>,
	internalTweakFn?: Tweak.Fn<TContract>,
	deps: DependencyList = [],
): Slot.Kit<TContract> {
	const clsContext = useClsContext<Cls.Type<TContract>>();

	return useMemo(
		() =>
			cls.create(
				userTweakFn,
				tweakWithContextToken(clsContext, internalTweakFn),
			),
		// biome-ignore lint/correctness/useExhaustiveDependencies: User driven
		deps,
	);
}
