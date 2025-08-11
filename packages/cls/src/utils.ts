import type {
	ClassName,
	Contract,
	TokensOfList,
	What,
	WhatClass,
	WhatToken,
} from "./types";

// /**
//  * Helper for classes only
//  */
// export const cls = <TContract extends Contract<any, any, any>>(
// 	classes: ClassName,
// ): WhatClass => {
// 	return {
// 		class: classes,
// 	};
// };

// /**
//  * Helper for tokens only
//  */
// export const token = <TContract extends Contract<any, any, any>>(
// 	tokens: TokensOfList<TContract>,
// ): WhatToken<TContract> => {
// 	return {
// 		token: tokens,
// 	};
// };

// /**
//  * Helper for both classes and tokens
//  */
// export const both = <TContract extends Contract<any, any, any>>(
// 	classes: ClassName,
// 	tokens: TokensOfList<TContract>,
// ): What<TContract> => {
// 	return {
// 		class: classes,
// 		token: tokens,
// 	};
// };
