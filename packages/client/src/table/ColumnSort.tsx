import { type Cls, tvc } from "@use-pico/cls";
import type { withQuerySchema } from "@use-pico/common";
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
			sort: "asc" | "desc" | undefined;
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

	const actionSize: Cls.VariantOf<typeof Action.cls, "size"> = "xs";

	const actionVariant: Cls.VariantsOf<typeof Action.cls> = {
		tone: "primary",
		theme: "light",
	};

	return (
		<div
			className={tvc([
				"flex",
				"items-center",
				"gap-1",
			])}
		>
			{type?.sort === undefined || type?.sort === "asc" ? (
				<Tooltip
					target={(props) => (
						<Action
							iconEnabled={AscIcon}
							onClick={() => {
								update(type?.sort === "asc" ? "desc" : "asc");
							}}
							size={actionSize}
							tweak={({ what }) => ({
								variant: what.variant({
									...actionVariant,
									tone:
										type?.sort === "asc"
											? "secondary"
											: actionVariant.tone,
								}),
							})}
							{...props}
						/>
					)}
				>
					{type?.sort === "asc" ? (
						<Tx
							label={
								"Sorted by asc, sort by desc; keeps column sorted in selected order"
							}
						/>
					) : (
						<Tx label={"Unsorted, sort by asc"} />
					)}
				</Tooltip>
			) : null}
			{type?.sort === "desc" ? (
				<Tooltip
					target={(props) => (
						<Action
							iconEnabled={DescIcon}
							onClick={() => {
								update("asc");
							}}
							size={actionSize}
							tweak={({ what }) => ({
								variant: what.variant({
									...actionVariant,
									tone:
										type?.sort === "desc"
											? "secondary"
											: actionVariant.tone,
								}),
							})}
							{...props}
						/>
					)}
				>
					<Tx
						label={
							"Sorted by desc, sort by asc; keeps column sorted in selected order"
						}
					/>
				</Tooltip>
			) : null}
			<Tooltip
				target={(props) => (
					<Action
						iconEnabled={SortIcon}
						onClick={() => {
							update(undefined);
						}}
						size={actionSize}
						tweak={({ what }) => ({
							variant: what.variant({
								...actionVariant,
								tone:
									type?.sort === undefined
										? "secondary"
										: actionVariant.tone,
							}),
						})}
						{...props}
					/>
				)}
			>
				<Tx label={"Remove sorting"} />
			</Tooltip>
		</div>
	);
};
