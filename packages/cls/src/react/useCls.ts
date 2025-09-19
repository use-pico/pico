import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { tweakWithContextToken } from "./tweakWithContextToken";
import { useClsContext } from "./useClsContext";

export function useCls<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweakFn?: Tweak.Fn<TContract>,
	internalTweakFn?: Tweak.Fn<TContract>,
) {
	const clsContext = useClsContext<Cls.Type<TContract>>();

	return cls.create(
		userTweakFn,
		tweakWithContextToken(clsContext, internalTweakFn),
	);
}
