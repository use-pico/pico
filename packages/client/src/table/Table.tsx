import { pathOf, type DeepKeys } from "@use-pico/common";
import type { FC } from "react";
import { v4 } from "uuid";
import { Action } from "../action/Action";
import { Cursor } from "../cursor/Cursor";
import { Fulltext } from "../fulltext/Fulltext";
import { AscIcon } from "../icon/AscIcon";
import { DescIcon } from "../icon/DescIcon";
import { EmptyResultIcon } from "../icon/EmptyResultIcon";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Icon } from "../icon/Icon";
import { SelectionAnyIcon } from "../icon/SelectionAnyIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import { SortIcon } from "../icon/SortIcon";
import { Status } from "../status/Status";
import { Tooltip } from "../tooltip/Tooltip";
import { Tx } from "../tx/Tx";
import { Row } from "./Row";
import { TableCss } from "./TableCss";
import type { ActionType } from "./type/ActionType";
import type { CellType } from "./type/CellType";
import type { ColumnType } from "./type/ColumnType";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";
import type { RowType } from "./type/RowType";
import type { SelectionType } from "./type/SelectionType";
import type { SortType } from "./type/SortType";
import type { StateType } from "./type/StateType";
import type { ToolbarType } from "./type/ToolbarType";
import { wrapFilter } from "./wrapFilter";
import { wrapSelection } from "./wrapSelection";
import { wrapSort } from "./wrapSort";

export namespace Table {
	export type Fulltext = StateType<Fulltext.Value>;

	export interface Props<TData extends DataType.Data, TContext = any>
		extends TableCss.Props {
		/**
		 * Data for the table.
		 */
		data?: TData[];
		/**
		 * All the columns defined in the table.
		 */
		columns: ColumnType.Props<TData, any>[];
		/**
		 * Only visible columns in the table.
		 */
		visible?: DeepKeys<TData>[];
		/**
		 * Hidden columns in the table.
		 *
		 * Hidden columns, they're not exclusive with visible columns.
		 */
		hidden?: DeepKeys<TData>[];
		/**
		 * Order of columns displayed in the table.
		 */
		order?: DeepKeys<TData>[];
		/**
		 * Selection configuration.
		 */
		selection?: SelectionType.Table;
		/**
		 * Filter configuration.
		 */
		filter?: FilterType.Table;
		/**
		 * Sort configuration.
		 */
		sort?: SortType.Table;
		/**
		 * Context for the table.
		 */
		context?: TContext;
		/**
		 * Row configuration.
		 */
		row?: RowType.Props<TData>;
		/**
		 * Action configuration.
		 */
		fulltext?: Fulltext;
		/**
		 * Toolbar, displayed next to the fulltext.
		 *
		 * Good UI may be just icons to be used.
		 */
		toolbar?: ToolbarType.Component<TContext>;
		cursor: Cursor.Props;
		empty?: FC;
		action?: ActionType.Props<TData, TContext>;
	}

	export type PropsEx<TData extends DataType.Data, TContext = any> = Omit<
		Props<TData, TContext>,
		"columns"
	>;
}

export const Table = <TData extends DataType.Data, TContext = any>({
	columns,
	data = [],
	visible,
	hidden = [],
	order = [],
	selection,
	context,
	row: rowProps,
	filter,
	sort,
	action,
	fulltext,
	toolbar: Toolbar = () => null,
	cursor,
	empty: Empty = () => (
		<Status
			icon={EmptyResultIcon}
			textTitle={<Tx label={"Nothing here"} />}
			textMessage={<Tx label={"There is nothing to see right now."} />}
		/>
	),
	variant,
	tva = TableCss,
	css,
}: Table.Props<TData, TContext>) => {
	const tv = tva({ ...variant, css }).slots;
	const TableAction = action?.table;
	const RowAction = action?.row;

	const $selection = wrapSelection({
		props: selection,
		data,
	});
	const $filter = wrapFilter({
		props: filter,
		columns,
	});
	const $sort = wrapSort({
		props: sort,
	});

	const $visible = columns
		.filter((column) => {
			if (!visible) {
				return !hidden.includes(column.name);
			}
			return visible.includes(column.name) && !hidden.includes(column.name);
		})
		.sort((a, b) => {
			const indexA = order.indexOf(a.name);
			const indexB = order.indexOf(b.name);
			return (
				(indexA === -1 ? Infinity : indexA) -
				(indexB === -1 ? Infinity : indexB)
			);
		});

	const $rows = data?.map((data) => {
		return {
			id: v4(),
			data,
			cells: $visible.map((column) => {
				return {
					column,
					data,
					value: pathOf(data).get(column.name),
				} satisfies CellType.Cell<TData, any, TContext>;
			}),
		} satisfies RowType.Row<TData, TContext>;
	});

	return (
		<div className={tv.base()}>
			<div className={"flex items-center justify-between gap-4"}>
				<div className={"flex flex-row items-center gap-2 flex-grow"}>
					<div className={"flex items-center gap-6 w-2/6 max-w-2/6"}>
						{fulltext ?
							<Fulltext
								value={fulltext.value}
								onFulltext={fulltext.set}
							/>
						:	null}
					</div>
					<div className={"flex flex-row items-center gap-2"}>
						<Toolbar
							selection={$selection}
							context={context}
						/>
					</div>
				</div>

				<div className={"flex flex-row items-center justify-center gap-2"}>
					<Cursor {...cursor} />
					{$filter ?
						$filter?.is() && (
							<Action
								iconEnabled={FilterRemoveIcon}
								css={{
									base: ["text-amber-500"],
								}}
								onClick={() => $filter.reset()}
							/>
						)
					:	null}
				</div>
			</div>
			<div className={"relative overflow-x-auto"}>
				<table className={tv.table()}>
					<thead className={tv.thead()}>
						<tr>
							{TableAction || RowAction || $selection ?
								<th className={"w-0"}>
									<div className={"flex flex-row items-center gap-2"}>
										{$selection ?
											<Icon
												icon={
													$selection.isAll() ? SelectionOnIcon
													: $selection.isAny() ?
														SelectionAnyIcon
													:	SelectionOffIcon
												}
												variant={{
													disabled: $selection.type === "single",
													size: "2xl",
												}}
												css={{
													base: tv.select({
														selected: $selection.isAny(),
													}),
												}}
												onClick={() => {
													$selection.event.onSelectAll();
												}}
											/>
										:	null}
										{TableAction ?
											<TableAction />
										:	null}
									</div>
								</th>
							:	null}

							{$visible.map((column) => {
								const Header = column.header || (() => null);

								return (
									<th
										key={`header-${column.name}`}
										className={tv.th()}
										style={
											column.size ?
												{
													maxWidth: `${column.size}rem`,
													width: `${column.size}rem`,
												}
											:	undefined
										}
									>
										<div
											className={"flex flex-row items-center justify-between"}
										>
											<Header />
											<div className={"flex flex-row items-center gap-2"}>
												{$sort && column.sort ?
													<>
														{(
															$sort.order({ column: column.sort }) === undefined
														) ?
															<Tooltip
																target={
																	<Action
																		iconEnabled={AscIcon}
																		onClick={() => {
																			$sort.toggle({ column: column.sort! });
																		}}
																	/>
																}
															>
																<Tx label={"Unsorted, sort by asc"} />
															</Tooltip>
														:	null}
														{$sort.order({ column: column.sort }) === "asc" ?
															<Tooltip
																target={
																	<Action
																		iconEnabled={DescIcon}
																		onClick={() => {
																			$sort.toggle({ column: column.sort! });
																		}}
																	/>
																}
															>
																<Tx label={"Sorted by asc, sort by desc"} />
															</Tooltip>
														:	null}
														{$sort.order({ column: column.sort }) === "desc" ?
															<Tooltip
																target={
																	<Action
																		iconEnabled={SortIcon}
																		onClick={() => {
																			$sort.toggle({ column: column.sort! });
																		}}
																	/>
																}
															>
																<Tx label={"Sorted by desc, remove sort"} />
															</Tooltip>
														:	null}
													</>
												:	null}
												{$filter && column.filter?.is({ filter: $filter }) && (
													<Icon
														icon={FilterRemoveIcon}
														variant={{
															size: "md",
														}}
														css={{
															base: [
																"opacity-50",
																"hover:opacity-100",
																"cursor-pointer",
															],
														}}
														onClick={() => {
															column.filter?.reset({ filter: $filter });
														}}
													/>
												)}
											</div>
										</div>
									</th>
								);
							})}
							<th></th>
						</tr>
					</thead>
					{data.length === 0 ? null : (
						<tbody className={tv.tbody()}>
							{$rows.map((row) => (
								<Row<TData>
									props={rowProps}
									key={row.id}
									row={row}
									action={action}
									context={context}
									variant={variant}
									filter={$filter}
									selection={$selection}
									tva={tva}
									css={css}
								/>
							))}
						</tbody>
					)}
				</table>
			</div>
			{data.length === 0 ?
				<Empty />
			:	null}
			<div className={"flex flex-row items-center justify-end gap-2"}>
				<div></div>
				<Cursor {...cursor} />
			</div>
		</div>
	);
};
