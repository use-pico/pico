import type { EntitySchema } from "@use-pico/common";
import { useCallback, useEffect, useMemo, useState } from "react";

export namespace useSelection {
	/** Selection mode - either single item or multiple items */
	export type Mode = "single" | "multi";

	/** Props for configuring the selection hook */
	export interface Props<T extends EntitySchema.Type> {
		mode: Mode;
		initial?: T[];
	}

	export interface Required<T extends EntitySchema.Type> {
		single(): T;
		singleId(): string;
		multi(): [
			T,
			...T[],
		];
		multiId(): [
			string,
			...string[],
		];
	}

	export interface Optional<T extends EntitySchema.Type> {
		single(): T | undefined;
		singleId(): string | undefined;
		multi(): T[];
		multiId(): string[];
	}

	export interface Selection<T extends EntitySchema.Type> {
		/** Current array of selected items */
		selection: T[];
		/** Current selection mode */
		mode: Mode;

		/** Set single selection (replaces current selection) */
		single(item: T): void;
		/** Add item to multi selection (won't duplicate if already selected) */
		multi(item: T): void;
		/** Toggle item selection */
		toggle(item: T): void;
		/** Remove item from selection */
		remove(item: T): void;

		/** Check if item with given id is selected */
		isSelected(id: string): boolean;
		/** True if any items are selected */
		hasAny: boolean;

		/** Clear selection */
		clear(): void;
		/** Count of selected items */
		count: number;

		/** Required selection access methods - throws if no items selected */
		required: Required<T>;
		/** Optional selection access methods - returns undefined/empty if no items selected */
		optional: Optional<T>;
	}
}

/** Deduplicate by id, keep first occurrence */
function dedupeById<T extends EntitySchema.Type>(arr: readonly T[]): T[] {
	const seen = new Set<string>();
	const out: T[] = [];
	for (const it of arr) {
		if (!seen.has(it.id)) {
			seen.add(it.id);
			out.push(it);
		}
	}
	return out;
}

/**
 * Hook for managing reactive selection state with single or multi-selection modes.
 * Single source of truth = `selection`.
 */
export function useSelection<T extends EntitySchema.Type>({
	mode,
	initial = [],
}: useSelection.Props<T>): useSelection.Selection<T> {
	// biome-ignore lint/correctness/useExhaustiveDependencies: Initial normalization only
	const normalized = useMemo(() => {
		const cleaned = dedupeById(initial);
		return mode === "single" ? cleaned.slice(0, 1) : cleaned;
	}, []);

	const [selection, setSelection] = useState<T[]>(normalized);

	// Normalize selection when mode changes
	useEffect(() => {
		setSelection((prev) => {
			const cleaned = dedupeById(prev);
			return mode === "single" ? cleaned.slice(0, 1) : cleaned;
		});
	}, [
		mode,
	]);

	/** Replace with exactly one item */
	const single = useCallback((item: T) => {
		setSelection([
			item,
		]);
	}, []);

	/** Add to multi (no duplicates) – functional update to avoid races */
	const multi = useCallback((item: T) => {
		setSelection((prev) => {
			if (prev.some((p) => p.id === item.id)) return prev;
			return [
				...prev,
				item,
			];
		});
	}, []);

	/** Toggle respecting current mode – functional to avoid races */
	const toggle = useCallback(
		(item: T) => {
			setSelection((prev) => {
				const idx = prev.findIndex((p) => p.id === item.id);

				if (mode === "single") {
					return idx >= 0
						? []
						: [
								item,
							];
				}

				// multi
				if (idx >= 0) {
					const next = prev.slice();
					next.splice(idx, 1);
					return next;
				}
				return [
					...prev,
					item,
				];
			});
		},
		[
			mode,
		],
	);

	/** Remove specific item */
	const remove = useCallback((item: T) => {
		setSelection((prev) => prev.filter((p) => p.id !== item.id));
	}, []);

	/** Clear all */
	const clear = useCallback(() => setSelection([]), []);

	// ----- Required (stable) -----
	const requiredSingle = useCallback((): T => {
		if (mode === "single" && selection.length === 1) {
			const it = selection[0];
			if (!it) {
				throw new Error("Invalid selection state");
			}
			return it;
		}
		throw new Error("No item selected in single mode");
	}, [
		mode,
		selection,
	]);

	const requiredSingleId = useCallback(
		(): string => requiredSingle().id,
		[
			requiredSingle,
		],
	);

	const requiredMulti = useCallback((): [
		T,
		...T[],
	] => {
		if (selection.length === 0) {
			throw new Error("No items selected in multi mode");
		}

		return selection as [
			T,
			...T[],
		];
	}, [
		selection,
	]);

	const requiredMultiId = useCallback((): [
		string,
		...string[],
	] => {
		if (selection.length === 0) {
			throw new Error("No items selected in multi mode");
		}

		return selection.map((x) => x.id) as [
			string,
			...string[],
		];
	}, [
		selection,
	]);

	// ----- Optional (stable) -----
	const optionalSingle = useCallback(
		(): T | undefined =>
			mode === "single" && selection.length === 1
				? selection[0]
				: undefined,
		[
			mode,
			selection,
		],
	);

	const optionalSingleId = useCallback(
		(): string | undefined =>
			mode === "single" && selection.length === 1
				? // biome-ignore lint/style/noNonNullAssertion: We're ok, bro
					selection[0]!.id
				: undefined,
		[
			mode,
			selection,
		],
	);

	const optionalMulti = useCallback(
		(): T[] => selection,
		[
			selection,
		],
	);

	const optionalMultiId = useCallback(
		(): string[] => selection.map((x) => x.id),
		[
			selection,
		],
	);

	return useMemo(
		() => ({
			selection,
			mode,
			single,
			multi,
			toggle,
			remove,

			isSelected: (id: string) => selection.some((p) => p.id === id),
			hasAny: selection.length > 0,

			clear,
			count: selection.length,

			required: {
				single: requiredSingle,
				singleId: requiredSingleId,
				multi: requiredMulti,
				multiId: requiredMultiId,
			},
			optional: {
				single: optionalSingle,
				singleId: optionalSingleId,
				multi: optionalMulti,
				multiId: optionalMultiId,
			},
		}),
		[
			selection,
			mode,
			single,
			multi,
			toggle,
			remove,
			clear,
			requiredSingle,
			requiredSingleId,
			requiredMulti,
			requiredMultiId,
			optionalSingle,
			optionalSingleId,
			optionalMulti,
			optionalMultiId,
		],
	);
}
