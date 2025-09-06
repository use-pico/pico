import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { withVariants } from "../utils/withVariants";
import { useCls } from "./useCls";

export function useClsEx<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweakFn?: Tweak.Fn<TContract>,
	internalTweakFn?: Tweak.Fn<TContract>,
) {
	return {
		slots: useCls(cls, userTweakFn, internalTweakFn),
		variants: withVariants(cls, userTweakFn, internalTweakFn),
	};
}
