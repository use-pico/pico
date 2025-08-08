import type { ClassName, Contract, What } from "./types";

/**
 * Just a little shortcut for supplying "class" (e.g. in rule -> slot)
 */
export const classes = <TContract extends Contract<any, any, any>>(
	classes: ClassName,
): What<TContract> => {
	return {
		class: classes,
	};
};
