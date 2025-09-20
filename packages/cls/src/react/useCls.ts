import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { clsTweakToken } from "../utils/clsTweakToken";
import { merge } from "../utils/merge";
import { useClsContext } from "./useClsContext";
import { useTweakContext } from "./useTweakContext";

export function useCls<TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
	userTweak?: Tweak.Type<TContract>,
	internalTweak?: Tweak.Type<TContract>,
) {
	const context = useClsContext();
	const tweak = useTweakContext();

	return cls.create(
		/**
		 * Again, a little lie here, but it may overall work.
		 */
		merge<TContract>(userTweak, tweak as Tweak.Type<TContract>),
		clsTweakToken<TContract>(
			/**
			 * This is a lie, but because CLS is quite flexible, it does not really matter.
			 *
			 * Overall, it's much simpler to use "general" context than connect also all components
			 * using custom "cls".
			 */
			context as Cls.Type<TContract>,
			internalTweak,
		),
	);
}
