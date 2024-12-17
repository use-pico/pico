import type { Index40 } from "./Index40";

export type IsTuple<T> =
	T extends (
		readonly any[] & {
			length: infer Length;
		}
	) ?
		Length extends Index40 ?
			T
		:	never
	:	never;
