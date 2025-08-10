import type { ClassName, Contract, WhatClass } from "./types";

export type ClassesFn<TContract extends Contract<any, any, any>> = (
	classes: ClassName,
) => WhatClass;

/**
 * Just a little shortcut for supplying "class" (e.g. in rule -> slot)
 */
export const classes = <TContract extends Contract<any, any, any>>(
	classes: ClassName,
): WhatClass => {
	return {
		class: classes,
	};
};
