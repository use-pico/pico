import type { NonEmptyArray } from "../type/NonEmptyArray";

export function isNonEmptyArray<T>(arr: T[]): arr is NonEmptyArray<T> {
	return arr.length > 0;
}
