import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { useClsContext } from "./useClsContext";

export function useCls<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweakFn?: Tweak.Fn<TContract>,
	internalTweakFn?: Tweak.Fn<TContract>,
) {
	const clsContext = useClsContext<Cls.Type<TContract>>();

	return cls.create(
		userTweakFn,
		clsContext?.definition?.token
			? (props) => {
					const config = internalTweakFn?.(props) ?? {};
					return {
						...config,
						token: {
							...(clsContext.definition.token as any),
							...(config.token as any), // Internal tokens win over context tokens
						} as any,
					};
				}
			: internalTweakFn,
	);
}
