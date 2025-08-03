import type { withQuerySchema } from "@use-pico/common";
import { match, P } from "ts-pattern";
import { Action } from "../action/Action";
import { AscIcon } from "../icon/AscIcon";
import { DescIcon } from "../icon/DescIcon";
import { SortIcon } from "../icon/SortIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { Tx } from "../tx/Tx";
import type { Table } from "./Table";

export namespace ColumnSort {
	export interface Props<TQuery extends withQuerySchema.Query> {
		state: Table.Sort.State<TQuery>;
		sort: Table.Sort.Props<TQuery>;
	}
}

export const ColumnSort = <TQuery extends withQuerySchema.Query>({
	state,
	sort,
}: ColumnSort.Props<TQuery>) => {
	const type = state.value?.find(({ value }) => value === sort.value);

	const update = (by: "asc" | "desc" | undefined) => {
		const currentItems = (state.value ?? []) as Array<{
			sort: "asc" | "desc";
			value: typeof sort.value;
		}>;

		// Find the index of the current column in the sort array
		const existingIndex = currentItems.findIndex(
			(item) => item.value === sort.value,
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
			return;
		}

		// Create the new sort item
		const newSortItem = {
			sort: by,
			value: sort.value,
		};

		// If column already exists, update it in-place
		if (existingIndex !== -1) {
			const newItems = [
				...currentItems,
			];
			newItems[existingIndex] = newSortItem;
			state.set(newItems);
			return;
		}

		// If column doesn't exist, add it to the end
		state.set([
			...currentItems,
			newSortItem,
		]);
	};

	return match(type)
		.with(
			{
				sort: "asc",
			},
			() => {
				return (
					<Tooltip
						target={
							<Action
								iconEnabled={DescIcon}
								onClick={() => {
									update("desc");
								}}
								variant={{
									borderless: true,
								}}
							/>
						}
					>
						<Tx label={"Sorted by asc, sort by desc"} />
					</Tooltip>
				);
			},
		)
		.with(
			{
				sort: "desc",
			},
			() => {
				return (
					<Tooltip
						target={
							<Action
								iconEnabled={SortIcon}
								onClick={() => {
									update(undefined);
								}}
								variant={{
									borderless: true,
								}}
							/>
						}
					>
						<Tx label={"Sorted by desc, remove sort"} />
					</Tooltip>
				);
			},
		)
		.with(P.nullish, () => {
			return (
				<Tooltip
					target={
						<Action
							iconEnabled={AscIcon}
							onClick={() => {
								update("asc");
							}}
							variant={{
								borderless: true,
							}}
						/>
					}
				>
					<Tx label={"Unsorted, sort by asc"} />
				</Tooltip>
			);
		})
		.otherwise(() => {
			return null;
		});
};
