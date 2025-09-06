import type { Contract } from "../types/Contract";
import type { What } from "../types/What";

export const what = <
	TContract extends Contract.Any,
>(): What.Type<TContract> => ({
	css: (classes) => ({
		class: classes,
	}),
	token: (tokens) => ({
		token: tokens,
	}),
	both: (classes, tokens) => ({
		class: classes,
		token: tokens,
	}),
	slot: (slot) => slot,
	variant: (variant) => variant,
});
