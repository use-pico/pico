import {
	cssOf,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema,
} from "@use-pico/common";
import { useSourceQuery } from "../query/useSourceQuery";
import { Cell } from "./Cell";
import { Table } from "./Table";

export namespace Body {
	export interface Props<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Pick<
			Table.Props<TColumns, TQuerySchema, TSchema>,
			| "render"
			| "columns"
			| "hidden"
			| "withSourceQuery"
			| "withQueryStore"
			| "selectionStore"
			| "selection"
			| "refresh"
			| "action"
			| "row"
			| "onDoubleClick"
		> {}
}

export const Body = <
	TColumns extends string,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>({
	withQueryStore,
	withSourceQuery,
	selectionStore,
	selection,
	action,
	row,
	refresh,
	render,
	columns,
	onDoubleClick,
	hidden = [],
}: Body.Props<TColumns, TQuerySchema, TSchema>) => {
	const Row = row;
	const result = useSourceQuery({
		store: withQueryStore,
		withSourceQuery,
		refetchInterval: refresh,
	});
	const $selectionStore = selectionStore?.useSelector$(
		({ select, toggle, isSelected, isCurrent }) => ({
			select,
			toggle,
			isSelected,
			isCurrent,
		}),
	);

	return (
		<tbody>
			{result.data?.map((item) => (
				<tr
					key={item.id}
					className={cssOf(
						"border-b hover:bg-slate-100",
						"odd:bg-white",
						"even:bg-slate-50",
						selection !== "none" && "cursor-pointer",
						$selectionStore?.isSelected(item) &&
							"odd:bg-blue-100 even:bg-blue-200 hover:bg-sky-100",
						$selectionStore?.isCurrent(item) &&
							"odd:bg-green-100 even:bg-green-200 hover:bg-teal-100",
						$selectionStore?.isCurrent(item) &&
							$selectionStore?.isSelected(item) &&
							"odd:bg-amber-100 even:bg-amber-200 hover:bg-yellow-100",
					)}
				>
					{(Row || action) && (
						<td className={"w-0"}>{Row && <Row entity={item} />}</td>
					)}
					{columns
						?.filter((column) => !hidden?.includes(column))
						?.map((column) => (
							<Cell
								key={`table-column-body-${column}-${item.id}`}
								withQueryStore={withQueryStore}
								render={render[column]}
								item={item}
								onClick={() => {
									switch (selection) {
										case "single":
											$selectionStore?.select(item, selection);
											break;
										case "multi":
											$selectionStore?.toggle(item);
											break;
									}
								}}
								onDoubleClick={() => {
									if (selection === "single") {
										$selectionStore?.select(item, selection);
									}
									onDoubleClick?.(item);
								}}
							/>
						))}
				</tr>
			))}
		</tbody>
	);
};
