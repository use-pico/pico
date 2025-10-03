import { useEffect, useRef, useState } from "react";

export namespace useSetUnset {
	export type Transition = "none" | "mount" | "set" | "unset" | "change";
	export type MountStatus = Extract<Transition, "set" | "unset">;

	export interface Props<T> {
		value: T | null | undefined;
		/** Called once on first render with the initial status ("set" or "unset") */
		onMount?: (value: T | null | undefined, status: MountStatus) => void;
		/** Called when value transitions from nullish -> defined */
		onTransitionSet?: (value: T) => void;
		/** Called when value transitions from defined -> nullish */
		onTransitionUnset?: (value: T) => void;
		/** Called when the set/unset status stays the same and no value change */
		onTransitionNone?: (value: T | null | undefined) => void;
		/** Called when both prev and next are defined and value changed */
		onTransitionChange?: (value: T, prev: T) => void;
	}
}

/**
 * Tracks transitions between "unset" (null/undefined) and "set" (non-nullish),
 * and reports "change" only when both prev and next are defined and differ.
 * Returns [value, transition], where transition ∈ {"none","mount","set","unset","change"}.
 */
export function useSetUnset<T>(props: useSetUnset.Props<T>): [
	T | null | undefined,
	useSetUnset.Transition,
] {
	const {
		value,
		onMount,
		onTransitionSet,
		onTransitionUnset,
		onTransitionNone,
		onTransitionChange,
	} = props;

	const prevRef = useRef<T | null | undefined>(value);
	const mountedRef = useRef(false);
	const [transition, setTransition] =
		useState<useSetUnset.Transition>("mount");

	// Mount-only effect
	// biome-ignore lint/correctness/useExhaustiveDependencies: onMount is intentionally excluded
	useEffect(() => {
		const currIsSet = value != null;
		const status: useSetUnset.MountStatus = currIsSet ? "set" : "unset";

		onMount?.(value, status);
		setTransition("none");
		prevRef.current = value;
		mountedRef.current = true;
	}, []);

	// Update effect
	useEffect(() => {
		if (!mountedRef.current) {
			return;
		}

		const prev = prevRef.current;
		const prevIsSet = prev != null;
		const currIsSet = value != null;

		let next: useSetUnset.Transition;

		if (prevIsSet !== currIsSet) {
			next = currIsSet ? "set" : "unset";
		} else {
			if (currIsSet && prevIsSet && !Object.is(prev, value)) {
				next = "change";
			} else {
				next = "none";
			}
		}

		if (next === "set") {
			onTransitionSet?.(value as T);
		} else if (next === "unset") {
			onTransitionUnset?.(prev as T);
		} else if (next === "change") {
			onTransitionChange?.(value as T, prev as T);
		} else {
			onTransitionNone?.(value);
		}

		setTransition(next);
		prevRef.current = value;
	}, [
		value,
		onTransitionSet,
		onTransitionUnset,
		onTransitionNone,
		onTransitionChange,
	]);

	return [
		value,
		transition,
	];
}
