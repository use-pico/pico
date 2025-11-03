import type { EntitySchema } from "@use-pico/common/schema";
import { useCallback, useMemo, useRef, useState } from "react";

export namespace useSelection {
	/** Selection mode - either single item or multiple items */
	export type Mode = "single" | "multi";

	/** Props for configuring the selection hook */
	export interface Props<T extends EntitySchema.Type> {
		mode: Mode; // Assumed static during component lifetime
		initial?: T[];
		/** Called in single mode when exactly one item is selected (always with value) */
		onSingle?: (item: T) => void;
		/** Called on any change (including empty) — also in single mode */
		onMulti?: (items: T[]) => void;
		/** Called in single mode with the selected item or undefined */
		onSelect?: (item: T | undefined) => void;
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
		selection: T[];
		mode: Mode;

		set(items: T[]): void;
		single(item: T): void;
		multi(item: T): void;
		toggle(item: T): void;
		remove(item: T): void;

		isSelected(id: string): boolean;
		hasAny: boolean;

		/** Clear selection */
		clear(): void;
		/** Count of selected items */
		count: number;

		/** Return true if ANY of provided items are selected */
		some(items: T[]): boolean;
		/** Return true if ALL of provided items are selected */
		every(items: T[]): boolean;

		required: Required<T>;
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

export function useSelection<T extends EntitySchema.Type>({
	mode,
	initial = [],
	onSingle,
	onMulti,
	onSelect,
}: useSelection.Props<T>): useSelection.Selection<T> {
	// Initial normalization only (mode is static)
	// biome-ignore lint/correctness/useExhaustiveDependencies: One time shot
	const initialNormalized = useMemo(() => {
		const cleaned = dedupeById(initial);
		return mode === "single" ? cleaned.slice(0, 1) : cleaned;
	}, []); // intentionally once

	const [selection, setSelection] = useState<T[]>(initialNormalized);
	const selectionRef = useRef(selection);
	selectionRef.current = selection;

	/** Dispatch callbacks immediately from actions (never on mount) */
	const dispatch = useCallback(
		(next: T[]) => {
			if (mode === "single") {
				const item = next[0];
				onSelect?.(item);
				if (item) onSingle?.(item);
				// Always notify onMulti even in single mode (including empty)
				onMulti?.(next);
				return;
			}
			// Multi mode: always report (including empty)
			onMulti?.(next);
		},
		[
			mode,
			onMulti,
			onSelect,
			onSingle,
		],
	);

	/** Centralized setter that normalizes and dispatches */
	const apply = useCallback(
		(next: T[]) => {
			const cleaned = dedupeById(next);
			const normalized =
				mode === "single" ? cleaned.slice(0, 1) : cleaned;
			setSelection(normalized);
			dispatch(normalized);
		},
		[
			mode,
			dispatch,
		],
	);

	/** Replace with exactly one item */
	const single = useCallback(
		(item: T) => {
			apply([
				item,
			]);
		},
		[
			apply,
		],
	);

	/** Add to multi (no duplicates). If already present, still dispatch current state. */
	const multi = useCallback(
		(item: T) => {
			const prev = selectionRef.current;
			if (prev.some((p) => p.id === item.id)) {
				apply(prev);
				return;
			}
			apply([
				...prev,
				item,
			]);
		},
		[
			apply,
		],
	);

	/** Toggle respecting current mode */
	const toggle = useCallback(
		(item: T) => {
			const prev = selectionRef.current;
			const idx = prev.findIndex((p) => p.id === item.id);

			if (mode === "single") {
				apply(
					idx >= 0
						? []
						: [
								item,
							],
				);
				return;
			}

			if (idx >= 0) {
				const next = prev.slice();
				next.splice(idx, 1);
				apply(next);
				return;
			}

			apply([
				...prev,
				item,
			]);
		},
		[
			mode,
			apply,
		],
	);

	/** Remove specific item */
	const remove = useCallback(
		(item: T) => {
			const prev = selectionRef.current;
			apply(prev.filter((p) => p.id !== item.id));
		},
		[
			apply,
		],
	);

	/** Clear selection */
	const clear = useCallback(() => {
		apply([]);
	}, [
		apply,
	]);

	/** Replace with items (normalized inside) */
	const set = useCallback(
		(items: T[]) => {
			apply(items);
		},
		[
			apply,
		],
	);

	// ----- Derived helpers (stable) -----
	const requiredSingle = useCallback((): T => {
		if (mode === "single" && selection.length === 1) {
			const it = selection[0];
			if (!it) throw new Error("Invalid selection state");
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
				? selection[0]?.id
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

	const some = useCallback(
		(items: T[]): boolean =>
			items.some((item) => selection.some((sel) => sel.id === item.id)),
		[
			selection,
		],
	);

	const every = useCallback(
		(items: T[]): boolean =>
			items.every((item) => selection.some((sel) => sel.id === item.id)),
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
			set,

			isSelected: (id: string) => selection.some((p) => p.id === id),
			hasAny: selection.length > 0,

			clear,
			count: selection.length,

			some,
			every,

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
			set,
			clear,
			requiredSingle,
			requiredSingleId,
			requiredMulti,
			requiredMultiId,
			optionalSingle,
			optionalSingleId,
			optionalMulti,
			optionalMultiId,
			some,
			every,
		],
	);
}
