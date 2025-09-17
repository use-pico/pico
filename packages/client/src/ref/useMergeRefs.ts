import { type Ref, useMemo } from "react";
import { mergeRefs } from "./mergeRefs";

export function useMergeRefs<T>(refs: (Ref<T> | undefined)[]): Ref<T> {
	// biome-ignore lint/correctness/useExhaustiveDependencies: We're ok here, don't cry.
	return useMemo(() => mergeRefs(refs), refs);
}
