import type { FC } from "react";
import { Action } from "../action/Action";
import { Cursor } from "../cursor/Cursor";
import { Fulltext } from "../fulltext/Fulltext";
import { EmptyResultIcon } from "../icon/EmptyResultIcon";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Icon } from "../icon/Icon";
import { SelectionAny } from "../icon/SelectionAny";
import { SelectionOff } from "../icon/SelectionOff";
import { SelectionOn } from "../icon/SelectionOn";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";
import { Row } from "./Row";
import { TableCss } from "./TableCss";
import type { DataType } from "./type/DataType";
import type { UseTable } from "./type/UseTable";
import type { useTable } from "./useTable";

export namespace Table {
	export namespace Action {
		export interface TableProps<TData extends DataType.Data> {
			table: UseTable<TData>;
		}

		export interface RowProps<TData extends DataType.Data> {
			table: UseTable<TData>;
			data: TData;
		}
	}

	export interface Action<TData extends DataType.Data> {
		/**
		 * Table-wise action.
		 */
		table?: FC<Action.TableProps<TData>>;
		/**
		 * Table row action.
		 */
		row?: FC<Action.RowProps<TData>>;
	}

	export interface Fulltext {
		value: Fulltext.Value;
		onFulltext: Fulltext.OnFulltext;
	}

	export interface Props<TData extends DataType.Data> extends TableCss.Props {
		table: UseTable<TData>;
		fulltext?: Fulltext;
		cursor: Cursor.Props;
		empty?: FC;
		action?: Action<TData>;
	}

	export type PropsEx<TData extends DataType.Data> = Omit<
		Props<TData>,
		"table"
	> & {
		table: useTable.PropsEx<TData>;
	};
}

export const Table = <TData extends DataType.Data>({
	table,
	fulltext,
	cursor,
	empty: Empty = () => (
		<Status
			icon={EmptyResultIcon}
			textTitle={<Tx label={"Nothing here"} />}
			textMessage={<Tx label={"There is nothing to see right now."} />}
		/>
	),
	action,
	variant,
	tva = TableCss,
	css,
}: Table.Props<TData>) => {
	const tv = tva({ ...variant, css }).slots;
	const TableAction = action?.table;
	const RowAction = action?.row;

	return (
		<div className={tv.base()}>
			<div className={"flex items-center justify-between"}>
				<div className={"flex items-center gap-6 w-1/3"}>
					{fulltext ?
						<Fulltext {...fulltext} />
					:	null}
				</div>

				<div className={"flex flex-row items-center justify-center gap-2"}>
					<Cursor {...cursor} />
					{table.filter.is() && (
						<Action
							iconEnabled={FilterRemoveIcon}
							css={{
								base: ["text-amber-500"],
							}}
							onClick={() => table.filter.reset()}
						/>
					)}
				</div>
			</div>
			<div className={"relative overflow-x-auto"}>
				<table className={tv.table()}>
					<thead className={tv.thead()}>
						<tr>
							{TableAction || RowAction || table.selection.enabled ?
								<th className={"w-0"}>
									<div className={"flex flex-row items-center gap-2"}>
										{table.selection.enabled ?
											<Icon
												icon={
													table.selection.isAll() ? SelectionOn
													: table.selection.isAny() ?
														SelectionAny
													:	SelectionOff
												}
												variant={{
													disabled: table.selection.isSingle,
												}}
												css={{
													base: tv.select({
														selected: table.selection.isAny(),
													}),
												}}
												onClick={table.selection.withAllHandler()}
											/>
										:	null}
										{TableAction ?
											<TableAction table={table} />
										:	null}
									</div>
								</th>
							:	null}

							{table.visible.map((column) => {
								const Render = column.def.header || (() => null);

								return (
									<th
										key={column.id}
										className={tv.th()}
										style={
											column.def.size ?
												{ width: `${column.def.size}rem` }
											:	undefined
										}
									>
										<div
											className={"flex flex-row items-center justify-between"}
										>
											<Render table={table} />
											<div className={"flex flex-row items-center gap-2"}>
												{column.filter?.is() && (
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
															column.filter?.reset();
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
					{table.isEmpty ? null : (
						<tbody className={tv.tbody()}>
							{table.rows?.map((row) => (
								<Row
									key={row.id}
									row={row}
									table={table}
									action={action}
									variant={variant}
									tva={tva}
									css={css}
								/>
							))}
						</tbody>
					)}
				</table>
			</div>
			{table.isEmpty ?
				<Empty />
			:	null}
			<div className={"flex flex-row items-center justify-end gap-2"}>
				<div></div>
				<Cursor {...cursor} />
			</div>
		</div>
	);
};
