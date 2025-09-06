import type { Contract } from "../types/Contract";
import type { Definition } from "../types/Definition";

export const def = <
	TContract extends Contract.Any,
>(): Definition.Def.Type<TContract> => ({
	root: (slot, override = false) => ({
		match: undefined,
		slot,
		override,
	}),
	rule: (match, slot, override = false) => ({
		match,
		slot,
		override,
	}),
	token: (token) => token,
	defaults: (defaults) => defaults,
});
