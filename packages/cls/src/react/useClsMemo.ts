import { type DependencyList, useMemo } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { clsTweakToken } from "../utils/clsTweakToken";
import { merge } from "../utils/merge";
import { useClsContext } from "./useClsContext";
import { useTweakContext } from "./useTweakContext";

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
 * const slots = useClsMemo(ButtonCls, {
 *   variant: { size: "lg", tone: "primary" }
 * });
 *
 * // With user and internal tweak functions
 * const slots = useClsMemo(
 *   ButtonCls,
 *   userTweak, // User customization from props
 *   { // Internal component logic
 *     variant: {
 *       disabled: disabled || loading // Component-controlled state
 *     }
 *   }
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
 *     {
 *       variant: { size, tone },
 *       slot: {
 *         root: { class: ["transition-all", "duration-200"] }
 *       }
 *     },
 *     {
 *       variant: { disabled: disabled || loading }
 *     }
 *   );
 *
 *   return <button className={slots.root()}>Button</button>;
 * };
 * ```
 */
export function useClsMemo<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweak?: Tweak.Type<TContract>,
	internalTweak?: Tweak.Type<TContract>,
	deps: DependencyList = [],
): Cls.Kit<TContract> {
	const context = useClsContext();
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
