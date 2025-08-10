import type { Cls, Contract, CreateConfig, WhatUtil } from "../types";
import { useClsContext } from "./ClsContext";

export function useCls<TContract extends Contract<any, any, any>>(
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

	// Merge context tokens with internal config
	let mergedInternalConfig = internalConfigFn;
	if (contextCls?.definition?.token) {
		mergedInternalConfig = (props: WhatUtil<TContract>) => {
			const config = internalConfigFn?.(props) ?? {};
			return {
				...config,
				token: {
					...contextCls.definition.token,
					...config.token, // Internal tokens win over context tokens
				} as any, // Type assertion for runtime token merging
			};
		};
	}

	// Simple implementation - creates classes on every render
	// For performance optimization, consider memoizing the config objects
	return clsInstance.create(userConfigFn, mergedInternalConfig);
}
