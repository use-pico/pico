import type { FC } from "react";
import { Action } from "../action/Action";
import { Cursor } from "../cursor/Cursor";
import { Fulltext } from "../fulltext/Fulltext";
import { EmptyResultIcon } from "../icon/EmptyResultIcon";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Icon } from "../icon/Icon";
import { SelectionAnyIcon } from "../icon/SelectionAnyIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";
import { Row } from "./Row";
import { TableCss } from "./TableCss";
import type { DataType } from "./type/DataType";
import type { UseTable } from "./type/UseTable";
import type { useTable } from "./useTable";

export namespace Table {
	export namespace Action {
		export interface TableProps<TData extends DataType.Data, TContext = any> {
			table: UseTable<TData, TContext>;
		}

		export interface RowProps<TData extends DataType.Data, TContext = any> {
			table: UseTable<TData, TContext>;
			data: TData;
		}
	}

	export interface Action<TData extends DataType.Data, TContext = any> {
		/**
		 * Table-wise action.
		 */
		table?: FC<Action.TableProps<TData, TContext>>;
		/**
		 * Table row action.
		 */
		row?: FC<Action.RowProps<TData, TContext>>;
	}

	export interface Fulltext {
		value: Fulltext.Value;
		set: Fulltext.OnFulltext;
	}

	export namespace Toolbar {
		export interface Props<TData extends DataType.Data, TContext = any> {
			table: UseTable<TData, TContext>;
		}

		export type Toolbar<TData extends DataType.Data, TContext = any> = FC<
			Props<TData, TContext>
		>;
	}

	export interface Props<TData extends DataType.Data, TContext = any>
		extends TableCss.Props {
		table: UseTable<TData, TContext>;
		fulltext?: Fulltext;
		/**
		 * Toolbar, displayed next to the fulltext.
		 *
		 * Good UI may be just icons to be used.
		 */
		toolbar?: Toolbar.Toolbar<TData, TContext>;
		cursor: Cursor.Props;
		empty?: FC;
		action?: Action<TData, TContext>;
	}

	export type PropsEx<TData extends DataType.Data, TContext = any> = Omit<
		Props<TData>,
		"table"
	> & {
		table: useTable.PropsEx<TData, TContext>;
	};
}

export const Table = <TData extends DataType.Data, TContext = any>({
	table,
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
	action,
	variant,
	tva = TableCss,
	css,
}: Table.Props<TData, TContext>) => {
	const tv = tva({ ...variant, css }).slots;
	const TableAction = action?.table;
	const RowAction = action?.row;

	return (
		<div className={tv.base()}>
			<div className={"flex items-center justify-between"}>
				<div className={"flex flex-row items-center gap-2 w-1/3"}>
					<div className={"flex items-center gap-6 flex-grow"}>
						{fulltext ?
							<Fulltext
								value={fulltext.value}
								onFulltext={fulltext.set}
							/>
						:	null}
					</div>
					<div className={"flex flex-row items-center gap-2"}>
						<Toolbar table={table} />
					</div>
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
													table.selection.isAll() ? SelectionOnIcon
													: table.selection.isAny() ?
														SelectionAnyIcon
													:	SelectionOffIcon
												}
												variant={{
													disabled: table.selection.isSingle,
													size: "2xl",
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
												{
													maxWidth: `${column.def.size}rem`,
													width: `${column.def.size}rem`,
												}
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
