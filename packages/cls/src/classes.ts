import type { ClassName, Contract, TokensOfList, What } from "./types";

export type ClassesFn<TContract extends Contract<any, any, any>> = (
	classes: ClassName,
	tokens?: TokensOfList<TContract>,
) => What<TContract>;

/**
 * Just a little shortcut for supplying "class" (e.g. in rule -> slot)
 */
export const classes = <TContract extends Contract<any, any, any>>(
	classes: ClassName,
	tokens?: TokensOfList<TContract>,
): What<TContract> => {
	return {
		class: classes,
		token: tokens,
	};
};
