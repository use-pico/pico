import type { IsTuple } from "./IsTuple";

export namespace DeepKeys {
	export type Prefix<T, TPrefix, TDepth extends any[]> =
		TPrefix extends keyof T & (number | string) ?
			`${TPrefix}.${DeepKeys<T[TPrefix], [...TDepth, any]> & string}`
		:	never;

	export type AllowedIndexes<
		Tuple extends readonly any[],
		Keys extends number = never,
	> =
		Tuple extends readonly [] ? Keys
		: Tuple extends readonly [infer _, ...infer Tail] ?
			AllowedIndexes<Tail, Keys | Tail["length"]>
		:	Keys;
}

export type DeepKeys<T, TDepth extends any[] = []> =
	TDepth["length"] extends 5 ? never
	: unknown extends T ? string
	: T extends readonly any[] & IsTuple<T> ?
		| DeepKeys.AllowedIndexes<T>
		| DeepKeys.Prefix<T, DeepKeys.AllowedIndexes<T>, TDepth>
	: T extends any[] ? DeepKeys<T[number], [...TDepth, any]>
	: T extends Date ? never
	: T extends object ? (keyof T & string) | DeepKeys.Prefix<T, keyof T, TDepth>
	: never;
