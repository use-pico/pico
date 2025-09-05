import type { Cls, WhatUtil } from "../types";
import type { Contract } from "../types/Contract";
import { withVariants } from "../utils/withVariants";
import { useCls } from "./useCls";

export function useClsEx<TContract extends Contract.Any>(
	clsInstance: Cls<TContract>,
	userConfigFn?: WhatUtil.Config.Fn<TContract>,
	internalConfigFn?: WhatUtil.Config.Fn<TContract>,
) {
	// Get slots using useCls
	const slots = useCls(clsInstance, userConfigFn, internalConfigFn);

	// Get variants using withVariants
	const variants = withVariants(clsInstance, userConfigFn, internalConfigFn);

	return {
		slots,
		variants,
	};
}
