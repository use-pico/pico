import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";

/**
 * Returns an internal tweak function that merges context tokens with the
 * internal tweak config. Internal tokens win over context tokens.
 */
export function tweakWithContextToken<TContract extends Contract.Any>(
	clsContext: Cls.Type<TContract> | undefined,
	internalTweakFn?: Tweak.Fn<TContract>,
): Tweak.Fn<TContract> | undefined {
	if (clsContext?.definition?.token) {
		return (props) => {
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

	return internalTweakFn;
}
