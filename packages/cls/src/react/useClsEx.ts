import type { Cls, Contract, WhatUtil } from "../types";
import { withVariants } from "../withVariants";
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
