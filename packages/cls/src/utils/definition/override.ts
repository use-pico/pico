import type { Contract } from "../../types/Contract";
import type { Definition } from "../../types/Definition";

export const override = <
	TContract extends Contract.Any,
>(): Definition.Def.Type<TContract> => ({
	root: (slot, override = true) => ({
		match: undefined,
		slot,
		override,
	}),
	rule: (match, slot, override = true) => ({
		match,
		slot,
		override,
	}),
	token: (token) => token,
	defaults: (defaults) => defaults,
});
