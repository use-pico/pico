import type { StateType } from "@use-pico/common";
import { Action } from "../action/Action";
import { Cursor } from "../cursor/Cursor";
import { Fulltext } from "../fulltext/Fulltext";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import type { Table } from "./Table";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";
import type { SelectionType } from "./type/SelectionType";
import type { ToolbarType } from "./type/ToolbarType";

export namespace TableTools {
	export interface Props<TData extends DataType.Data, TContext = any> {
		data: TData[];
		fulltext: StateType<Fulltext.Value> | undefined;
		controlsHidden: Table.Controls[];
		toolbar: ToolbarType.Component<TData, TContext>;
		cursor?: Cursor.Props;
		context: TContext | undefined;
		selection: SelectionType.Selection | undefined;
		filter: FilterType.Filter | undefined;
	}
}

export const TableTools = <TData extends DataType.Data, TContext = any>({
	data,
	fulltext,
	controlsHidden,
	toolbar: Toolbar,
	cursor,
	context,
	selection,
	filter,
}: TableTools.Props<TData, TContext>) => {
	return (
		<div className={"flex items-center justify-between gap-4"}>
			<div className={"flex flex-row items-center gap-2 flex-grow"}>
				<div className={"flex items-center gap-6"}>
					{fulltext ? (
						<Fulltext
							value={fulltext.value}
							onFulltext={fulltext.set}
							cls={{
								base: [
									"w-96",
								],
							}}
						/>
					) : null}
				</div>
				<div className={"flex flex-row items-center gap-2"}>
					{controlsHidden.includes("toolbar") ? null : (
						<Toolbar
							data={data}
							selection={selection}
							context={context}
						/>
					)}
				</div>
			</div>

			<div className={"flex flex-row items-center justify-center gap-2"}>
				{cursor ? <Cursor {...cursor} /> : <div />}
				{filter
					? filter.is() && (
							<Action
								iconEnabled={FilterRemoveIcon}
								cls={{
									base: [
										"text-amber-500",
									],
								}}
								onClick={() => filter.reset()}
							/>
						)
					: null}
			</div>
		</div>
	);
};
