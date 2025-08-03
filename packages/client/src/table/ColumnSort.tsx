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
		state.set([
			...(state.value?.filter((item) => item.value !== sort.value) ?? []),
			...(by
				? [
						{
							sort: by,
							value: sort.value,
						},
					]
				: []),
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
