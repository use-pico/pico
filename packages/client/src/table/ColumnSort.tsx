import type { FC } from "react";
import { Action } from "../action/Action";
import { AscIcon } from "../icon/AscIcon";
import { DescIcon } from "../icon/DescIcon";
import { SortIcon } from "../icon/SortIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { Tx } from "../tx/Tx";
import type { ColumnType } from "./type/ColumnType";
import type { SortType } from "./type/SortType";

export namespace ColumnSort {
	export interface Props {
		sort: SortType.Sort | undefined;
		column: ColumnType.Props<any, any, any>;
	}
}

export const ColumnSort: FC<ColumnSort.Props> = ({ sort, column }) => {
	if (!sort || !column.sort) {
		return null;
	}

	const columnSort = column.sort;

	if (
		sort.order({
			column: columnSort,
		}) === undefined
	) {
		return (
			<Tooltip
				target={
					<Action
						iconEnabled={AscIcon}
						onClick={() => {
							sort.toggle({
								column: columnSort,
							});
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
	}

	if (
		sort.order({
			column: columnSort,
		}) === "asc"
	) {
		return (
			<Tooltip
				target={
					<Action
						iconEnabled={DescIcon}
						onClick={() => {
							sort.toggle({
								column: columnSort,
							});
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
	}

	if (
		sort.order({
			column: columnSort,
		}) === "desc"
	) {
		return (
			<Tooltip
				target={
					<Action
						iconEnabled={SortIcon}
						onClick={() => {
							sort.toggle({
								column: columnSort,
							});
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
	}
};
