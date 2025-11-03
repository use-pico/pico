import type {
	CountSchema,
	EntitySchema,
	withQuerySchema,
} from "@use-pico/common/schema";
import type { useSelection } from "../../hook/useSelection";
import type { withQuery } from "../../query/withQuery";
import type { Cursor } from "../cursor/Cursor";
import { Fulltext } from "../fulltext/Fulltext";
import type { Table } from "./Table";
import { TableCursor } from "./TableCursor";

export namespace TablePrefix {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> {
		query: TQuery;
		fulltext: Fulltext.State | undefined;
		cursor: Cursor.State | undefined;
		withCountQuery: withQuery.Api<TQuery, CountSchema.Type> | undefined;
		toolbar: Table.Toolbar.RenderFn<TQuery, TData, TContext> | undefined;
		controlsHidden: Table.Controls[];
		selection: useSelection.Selection<TData> | undefined;
		filter: Table.Filter.State<TQuery> | undefined;
		context: TContext;
	}
}

export const TablePrefix = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
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
}: TablePrefix.Props<TQuery, TData, TContext>) => {
	return (
		<div
			data-ui="TablePrefix-root"
			className={"grid grid-cols-3 gap-4 items-center"}
		>
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
