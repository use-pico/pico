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
		<div className={"flex items-center justify-between gap-4"}>
			<div className={"flex flex-row items-center gap-2 flex-grow"}>
				<div className={"flex items-center gap-6"}>
					{fulltext ? (
						<Fulltext
							state={fulltext}
							cls={{
								slot: {
									base: {
										class: [
											"w-96",
										],
									},
								},
							}}
						/>
					) : null}
				</div>
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

			<div className={"flex flex-row items-center justify-center gap-2"}>
				{cursor && withCountQuery ? (
					<TableCursor
						withCountQuery={withCountQuery}
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
