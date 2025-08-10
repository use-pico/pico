import type { Contract, WhatUtil } from "./types";

export const what = <
	TContract extends Contract<any, any, any>,
>(): WhatUtil<TContract> => ({
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
});
