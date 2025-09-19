import { type DependencyList, useMemo } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Slot } from "../types/Slot";
import type { Tweak } from "../types/Tweak";
import type { Variant } from "../types/Variant";
import { withVariants } from "../utils/withVariants";
import { useClsMemo } from "./useClsMemo";

/**
 * Memoized version of `useClsEx` that returns both slots and variants.
 * - slots are memoized via `useCls` (which creates a stable factory)
 * - variants are memoized via `useMemo` using deps provided by caller
 */
export function useClsExMemo<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweakFn?: Tweak.Fn<TContract>,
	internalTweakFn?: Tweak.Fn<TContract>,
	deps: DependencyList = [],
): {
	slots: Slot.Kit<TContract>;
	variants: Variant.VariantOf<TContract>;
} {
	const slots = useClsMemo(cls, userTweakFn, internalTweakFn, deps);

	return useMemo(
		() => ({
			slots,
			variants: withVariants(cls, userTweakFn, internalTweakFn),
		}),
		// biome-ignore lint/correctness/useExhaustiveDependencies: User driven, we're OK here
		deps,
	);
}
