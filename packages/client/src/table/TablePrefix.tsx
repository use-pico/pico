import type { CountSchema, withQuerySchema } from "@use-pico/common";
import type { Cursor } from "../cursor/Cursor";
import { Fulltext } from "../fulltext/Fulltext";
import type { withQuery } from "../source/withQuery";
import type { Table } from "./Table";
import { TableCursor } from "./TableCursor";

export namespace TablePrefix {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TContext = any,
	> {
		query: TQuery;
		fulltext: Fulltext.State | undefined;
		cursor: Cursor.State | undefined;
		withCountQuery: withQuery.Api<TQuery, CountSchema.Type> | undefined;
		toolbar: Table.Toolbar.Render<TQuery, TContext> | undefined;
		controlsHidden: Table.Controls[];
		selection: Table.Selection.State | undefined;
		filter: Table.Filter.State<TQuery> | undefined;
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
	withCountQuery,
	controlsHidden,
	toolbar,
	selection,
	filter,
	context,
}: TablePrefix.Props<TQuery, TContext>) => {
	return (
		<div className={"grid grid-cols-3 gap-4 items-center"}>
			<div className={"inline-flex items-center gap-2"}>
				{fulltext ? <Fulltext state={fulltext} /> : null}
			</div>

			<div>
				<div className={"flex flex-row items-center gap-2"}>
					{controlsHidden.includes("toolbar")
						? null
						: toolbar?.({
								context,
								selection,
								filter,
							})}
				</div>
			</div>

			<div className={"justify-self-end"}>
				{cursor && withCountQuery ? (
					<TableCursor
						withCountQuery={withCountQuery}
						cursor={cursor}
						query={query}
					/>
				) : null}
			</div>
		</div>
	);
};
