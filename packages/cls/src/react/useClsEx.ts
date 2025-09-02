import type { Cls, Contract, WhatConfigFn } from "../types";
import { withVariants } from "../withVariants";
import { useCls } from "./useCls";

export function useClsEx<TContract extends Contract<any, any, any>>(
	clsInstance: Cls<TContract>,
	userConfigFn?: WhatConfigFn<TContract>,
	internalConfigFn?: WhatConfigFn<TContract>,
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
