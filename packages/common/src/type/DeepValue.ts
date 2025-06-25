export type DeepValue<T, TProp> = T extends Record<string | number, any>
	? TProp extends `${infer TBranch}.${infer TDeepProp}`
		? DeepValue<T[TBranch], TDeepProp>
		: T[TProp & string]
	: never;
