import type { OrderSchema } from "../schema/OrderSchema";
import type { StateType } from "../type/StateType";

export namespace withSort {
	export interface SortItem {
		sort?: OrderSchema.Type;
		value: string;
	}

	export interface Props {
		state: StateType<SortItem[] | null | undefined>;
		value: string;
		by?: OrderSchema.Type;
	}
}

/**
 * Manages sort state by adding, updating, or removing sort items from a state array.
 *
 * This function provides a convenient way to handle multi-column sorting by managing
 * an array of sort items. Each sort item represents a column/value to sort by along
 * with its sort direction (ascending or descending).
 *
 * **Behavior:**
 * - If `by` is not provided (undefined/null), the function removes the sort item
 *   for the given `value` from the sort array if it exists.
 * - If `by` is provided and a sort item with the given `value` already exists,
 *   it updates that item with the new sort direction.
 * - If `by` is provided and no sort item with the given `value` exists, it adds
 *   a new sort item to the end of the array.
 *
 * The function mutates the state by calling `state.set()` and returns the new array
 * of sort items (or undefined if nothing was changed).
 *
 * @param props - Configuration object
 * @param props.state - The state object containing the array of sort items
 * @param props.value - The column/field name to sort by
 * @param props.by - Optional sort direction ("asc" | "desc" | null | undefined).
 *   If not provided, the sort item will be removed from the array.
 *
 * @returns The updated array of sort items, or undefined if no changes were made
 *
 * @example
 * ```typescript
 * import { withSort } from "@use-pico/common/sort";
 * import { state } from "@use-pico/common";
 *
 * const sortState = state<SortItem[] | null>([{ value: "name", sort: "asc" }]);
 *
 * // Add a new sort column
 * withSort({ state: sortState, value: "age", by: "desc" });
 * // Result: [{ value: "name", sort: "asc" }, { value: "age", sort: "desc" }]
 *
 * // Update existing sort column
 * withSort({ state: sortState, value: "name", by: "desc" });
 * // Result: [{ value: "name", sort: "desc" }, { value: "age", sort: "desc" }]
 *
 * // Remove a sort column
 * withSort({ state: sortState, value: "age", by: undefined });
 * // Result: [{ value: "name", sort: "desc" }]
 *
 * // Toggle sort direction (common pattern)
 * const currentSort = sortState.value?.find(item => item.value === "name")?.sort;
 * const newSort = currentSort === "asc" ? "desc" : "asc";
 * withSort({ state: sortState, value: "name", by: newSort });
 * ```
 *
 * @example
 * ```typescript
 * // Usage in a table header component
 * const handleSortClick = (column: string) => {
 *   const existingSort = sortState.value?.find(item => item.value === column);
 *   const newDirection = existingSort?.sort === "asc" ? "desc" : "asc";
 *   withSort({ state: sortState, value: column, by: newDirection });
 * };
 * ```
 */
export const withSort = ({ value, state, by }: withSort.Props) => {
	const currentItems = state.value ?? [];

	// Find the index of the current column in the sort array
	const existingIndex = currentItems.findIndex(
		(item) => item.value === value,
	);

	// If no sort direction specified, remove the column from its current position
	if (!by) {
		if (existingIndex === -1) {
			return; // Column not found, nothing to remove
		}

		const newItems = [
			...currentItems,
		];
		newItems.splice(existingIndex, 1);
		state.set(newItems);
		return newItems;
	}

	// Create the new sort item
	const newSortItem = {
		sort: by,
		value: value,
	};

	// If column already exists, update it in-place
	if (existingIndex !== -1) {
		const newItems = [
			...currentItems,
		];
		newItems[existingIndex] = newSortItem;
		state.set(newItems);
		return newItems;
	}

	const result = [
		...currentItems,
		newSortItem,
	];

	// If column doesn't exist, add it to the end
	state.set(result);

	return result;
};
