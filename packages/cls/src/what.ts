import { match } from "./match";
import type { Contract, WhatUtil } from "./types";

export const what = <
	TContract extends Contract<any, any, any>,
>(): WhatUtil<TContract> => ({
	what: {
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
		variant: (variant) => variant,
	},
	override: {
		root: (slot, override = true) => match(undefined, slot, override),
		rule: ($match, slot, override = true) => match($match, slot, override),
		token: (token) => token,
	},
	def: {
		root: (slot, override = false) => match(undefined, slot, override),
		rule: match,
		token: (token) => token,
		defaults: (defaults) => defaults,
	},
});
