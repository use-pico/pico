import type { Contract, WhatUtil } from "./types";

export const what = <
	TContract extends Contract.Any,
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
		slot: (slot) => slot,
		variant: (variant) => variant,
	},
	override: {
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
	},
	def: {
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
	},
});
