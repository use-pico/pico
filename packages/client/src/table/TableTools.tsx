import { Action } from "../action/Action";
import { Cursor } from "../cursor/Cursor";
import { Fulltext } from "../fulltext/Fulltext";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import type { FilterType } from "./type/FilterType";
import type { SelectionType } from "./type/SelectionType";
import type { StateType } from "./type/StateType";
import type { ToolbarType } from "./type/ToolbarType";

export namespace TableTools {
	export interface Props<TContext = any> {
		fulltext: StateType<Fulltext.Value> | undefined;
		toolbarHidden: boolean;
		toolbar: ToolbarType.Component<TContext>;
		cursor: Cursor.Props;
		context: TContext | undefined;
		selection: SelectionType.Selection | undefined;
		filter: FilterType.Filter | undefined;
	}
}

export const TableTools = <TContext = any>({
	fulltext,
	toolbarHidden = false,
	toolbar: Toolbar,
	cursor,
	context,
	selection,
	filter,
}: TableTools.Props<TContext>) => {
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
					{toolbarHidden ? null : (
						<Toolbar
							selection={selection}
							context={context}
						/>
					)}
				</div>
			</div>

			<div className={"flex flex-row items-center justify-center gap-2"}>
				<Cursor {...cursor} />
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
