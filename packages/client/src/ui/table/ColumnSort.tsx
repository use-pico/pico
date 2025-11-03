import { type Cls, tvc } from "@use-pico/cls";
import type { withQuerySchema } from "@use-pico/common/schema";
import { withSort } from "@use-pico/common/sort";
import { AscIcon } from "../../icon/AscIcon";
import { DescIcon } from "../../icon/DescIcon";
import { SortIcon } from "../../icon/SortIcon";
import { Action } from "../action/Action";
import type { ActionCls } from "../action/ActionCls";
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

	const actionSize: Cls.VariantOf<ActionCls, "size"> = "xs";

	const actionVariant: Cls.VariantsOf<ActionCls> = {
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
								withSort({
									state,
									value: sort.value,
									by: type?.sort === "asc" ? "desc" : "asc",
								});
							}}
							size={actionSize}
							tweak={{
								variant: {
									...actionVariant,
									tone:
										type?.sort === "asc"
											? "secondary"
											: actionVariant.tone,
								},
							}}
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
								withSort({
									state,
									value: sort.value,
									by: "asc",
								});
							}}
							size={actionSize}
							tweak={{
								variant: {
									...actionVariant,
									tone:
										type?.sort === "desc"
											? "secondary"
											: actionVariant.tone,
								},
							}}
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
							withSort({
								state,
								value: sort.value,
								by: undefined,
							});
						}}
						size={actionSize}
						tweak={{
							variant: {
								...actionVariant,
								tone:
									type?.sort === undefined
										? "secondary"
										: actionVariant.tone,
							},
						}}
						{...props}
					/>
				)}
			>
				<Tx label={"Remove sorting"} />
			</Tooltip>
		</div>
	);
};
