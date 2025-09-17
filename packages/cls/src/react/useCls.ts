import type { DependencyList } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { useClsContext } from "./useClsContext";

export function useCls<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweakFn?: Tweak.Fn<TContract>,
	internalTweakFn?: Tweak.Fn<TContract>,
	/**
	 * It's expected that in common case, slots won't change, but if you find
	 * a slot not being updated, you've to provide dependency here.
	 *
	 * This may need you to extract some variants into component props, so you
	 * can forward them to this hook.
	 */
	deps: DependencyList = [],
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

	// return useCallback(
	// 	() =>
	// 		cls.create(
	// 			userTweakFn,
	// 			clsContext?.definition?.token
	// 				? (props) => {
	// 						const config = internalTweakFn?.(props) ?? {};
	// 						return {
	// 							...config,
	// 							token: {
	// 								...(clsContext.definition.token as any),
	// 								...(config.token as any), // Internal tokens win over context tokens
	// 							} as any,
	// 						};
	// 					}
	// 				: internalTweakFn,
	// 		),
	// 	// biome-ignore lint/correctness/useExhaustiveDependencies: User driven
	// 	deps,
	// );
}
