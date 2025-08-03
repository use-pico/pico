import type { StateType, withQuerySchema } from "@use-pico/common";
import { Fulltext } from "../fulltext/Fulltext";
import { TableCursor } from "../table/TableCursor";
import type { TableControl } from "./TableControl";

export namespace TablePrefix {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TContext = any,
	> {
		query: TQuery;
		fulltext?: StateType<Fulltext.Value>;
		cursor?: TableControl.Cursor.Props<TQuery>;
		// controlsHidden: Table.Controls[];
		// toolbar: ToolbarType.Component<TData, TContext>;
		// selection: SelectionType.Selection | undefined;
		// filter: FilterType.Filter | undefined;
		context: TContext;
	}
}

export const TablePrefix = <
	TQuery extends withQuerySchema.Query,
	TContext = any,
>({
	query,
	fulltext,
	cursor,
	// controlsHidden,
	// toolbar: Toolbar,
	// selection,
	// filter,
	// context,
}: TablePrefix.Props<TQuery, TContext>) => {
	return (
		<div className={"flex items-center justify-between gap-4"}>
			<div className={"flex flex-row items-center gap-2 flex-grow"}>
				<div className={"flex items-center gap-6"}>
					{fulltext ? (
						<Fulltext
							state={fulltext}
							cls={{
								base: [
									"w-96",
								],
							}}
						/>
					) : null}
				</div>
				{/* <div className={"flex flex-row items-center gap-2"}>
					{controlsHidden.includes("toolbar") ? null : (
						<Toolbar
							data={data}
							selection={selection}
							context={context}
						/>
					)}
				</div> */}
			</div>

			<div className={"flex flex-row items-center justify-center gap-2"}>
				{cursor ? (
					<TableCursor
						cursor={cursor}
						query={query}
					/>
				) : (
					<div />
				)}
				{/* {filter
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
					: null} */}
			</div>
		</div>
	);
};
