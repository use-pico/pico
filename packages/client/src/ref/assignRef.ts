import type { Ref, RefCallback } from "react";

export function assignRef<T>(
	ref: Ref<T> | undefined | null,
	value: T | null,
): ReturnType<RefCallback<T>> {
	if (typeof ref === "function") {
		return ref(value);
	} else if (ref) {
		ref.current = value;
	}
}
