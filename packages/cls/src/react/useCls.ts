import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import type { What } from "../types/What";
import { useClsContext } from "./ClsContext";

export function useCls<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweakFn?: Tweak.Fn<TContract>,
	internalTweakFn?: Tweak.Fn<TContract>,
) {
	const clsContext = useClsContext();

	let mergedInternalConfig = internalTweakFn;

	if (clsContext?.definition?.token) {
		mergedInternalConfig = (props: What.Props<TContract>) => {
			const config = internalTweakFn?.(props) ?? {};
			return {
				...config,
				token: {
					...(clsContext.definition.token as any),
					...(config.token as any), // Internal tokens win over context tokens
				} as any,
			};
		};
	}

	// Simple implementation - creates classes on every render
	// For performance optimization, consider memoizing the config objects
	return cls.create(userTweakFn, mergedInternalConfig);
}
