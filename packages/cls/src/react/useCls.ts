import type { Cls, CreateConfig, WhatUtil } from "../types";
import type { Contract } from "../types/Contract";
import { useClsContext } from "./ClsContext";

export function useCls<TContract extends Contract.Any>(
	clsInstance: Cls<TContract>,
	userConfigFn?: (
		props: WhatUtil<TContract>,
	) => Partial<CreateConfig<TContract>>,
	internalConfigFn?: (
		props: WhatUtil<TContract>,
	) => Partial<CreateConfig<TContract>>,
) {
	// Get context cls instance
	const contextCls = useClsContext();

	// Merge context tokens with internal config (flat-only)
	let mergedInternalConfig = internalConfigFn;
	if (contextCls?.definition?.token) {
		mergedInternalConfig = (props: WhatUtil<TContract>) => {
			const config = internalConfigFn?.(props) ?? {};
			return {
				...config,
				token: {
					...(contextCls.definition.token as any),
					...(config.token as any), // Internal tokens win over context tokens
				} as any,
			};
		};
	}

	// Simple implementation - creates classes on every render
	// For performance optimization, consider memoizing the config objects
	return clsInstance.create(userConfigFn, mergedInternalConfig);
}
