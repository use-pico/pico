import type { EntitySchema } from "@use-pico/common";
import { useCallback, useMemo, useState } from "react";

export namespace useSelection {
	/** Selection mode - either single item or multiple items */
	export type Mode = "single" | "multi";

	/** Props for configuring the selection hook */
	export interface Props<T extends EntitySchema.Type> {
		/** Selection mode - single or multi */
		mode: Mode;
		/** Initial selection state */
		initial?: T[];
	}

	/** Required selection access methods - throws if no items selected */
	export interface Required<T extends EntitySchema.Type> {
		/** Get single selected item (throws if none selected) */
		single(): T;
		singleId(): string;
		/** Get multi selected items (throws if none selected, returns non-empty array) */
		multi(): [
			T,
			...T[],
		];
		multiId(): [
			string,
			...string[],
		];
	}

	/** Optional selection access methods - returns undefined/empty if no items selected */
	export interface Optional<T extends EntitySchema.Type> {
		/** Get single selected item (returns undefined if none selected) */
		single(): T | undefined;
		singleId(): string | undefined;
		/** Get multi selected items (returns empty array if none selected) */
		multi(): T[];
		multiId(): string[];
	}

	/** Selection hook return interface with state and controls */
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
		/** Check if any items are selected */
		hasAny(): boolean;
		/** Required selection access methods - throws if no items selected */
		required: Required<T>;
		/** Optional selection access methods - returns undefined/empty if no items selected */
		optional: Optional<T>;
	}
}

/**
 * Hook for managing reactive selection state with single or multi-selection modes
 *
 * @param options Configuration options for the selection hook
 * @returns Selection interface with state and control methods
 *
 * @example
 * ```typescript
 * // Single selection
 * const selection = useSelection<CategorySchema.Type>({
 *   mode: "single",
 *   initial: []
 * });
 *
 * // Multi selection
 * const multiSelection = useSelection<CategorySchema.Type>({
 *   mode: "multi",
 *   initial: [category1, category2]
 * });
 * ```
 */
export function useSelection<T extends EntitySchema.Type>({
	mode,
	initial = [],
}: useSelection.Props<T>): useSelection.Selection<T> {
	const [selection, setSelection] = useState<T[]>(initial);

	// Memoized Set for O(1) lookups
	const selectedIds = useMemo(
		() => new Set(selection.map((item) => item.id)),
		[
			selection,
		],
	);

	/**
	 * Set single selection, replacing any current selection
	 */
	const single = useCallback((item: T) => {
		setSelection([
			item,
		]);
	}, []);

	/**
	 * Add item to multi-selection (prevents duplicates) - O(1) check
	 */
	const multi = useCallback(
		(item: T) => {
			// O(1) check using Set
			if (selectedIds.has(item.id)) {
				return; // Already selected, don't add again
			}
			setSelection((prev) => [
				...prev,
				item,
			]);
		},
		[
			selectedIds,
		],
	);

	/**
	 * Toggle item selection - behavior depends on mode:
	 * - Single mode: select item or clear selection
	 * - Multi mode: add/remove item from selection
	 */
	const toggle = useCallback(
		(item: T) => {
			const $isSelected = selectedIds.has(item.id);

			if (mode === "single") {
				setSelection(
					$isSelected
						? []
						: [
								item,
							],
				);
				return;
			}

			if (mode === "multi") {
				if ($isSelected) {
					setSelection((prev) =>
						prev.filter(
							(selectedItem) => selectedItem.id !== item.id,
						),
					);
					return;
				}

				setSelection((prev) => [
					...prev,
					item,
				]);
			}
		},
		[
			mode,
			selectedIds,
		],
	);

	/**
	 * Remove specific item from selection
	 */
	const remove = useCallback((item: T) => {
		setSelection((prev) =>
			prev.filter((selectedItem) => selectedItem.id !== item.id),
		);
	}, []);

	return useMemo(
		() => ({
			selection,
			mode,
			single,
			multi,
			toggle,
			remove,
			isSelected: selectedIds.has,
			hasAny: () => selection.length > 0,
			required: {
				single(): T {
					if (mode === "single" && selection.length === 1) {
						const single = selection[0];
						if (!single) {
							throw new Error("Invalid selection state");
						}
						return single;
					}
					throw new Error("No item selected in single mode");
				},
				singleId(): string {
					return this.single().id;
				},
				multi(): [
					T,
					...T[],
				] {
					if (selection.length === 0) {
						throw new Error("No items selected in multi mode");
					}
					return selection as [
						T,
						...T[],
					];
				},
				multiId(): [
					string,
					...string[],
				] {
					return Array.from(selectedIds) as [
						string,
						...string[],
					];
				},
			},
			optional: {
				single(): T | undefined {
					if (mode === "single" && selection.length === 1) {
						return selection[0];
					}
					return undefined;
				},
				singleId(): string | undefined {
					return this.single()?.id;
				},
				multi(): T[] {
					return selection;
				},
				multiId(): string[] {
					return Array.from(selectedIds);
				},
			},
		}),
		[
			selection,
			mode,
			single,
			multi,
			toggle,
			remove,
			selectedIds,
		],
	);
}
