import {
	cn,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema
}              from "@use-pico/common";
import {Sort}  from "./Sort";
import {Table} from "./Table";

export namespace Header {
	export type Props<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> =
		Pick<
			Table.Props<TColumns, TQuerySchema, TSchema>,
			"render" | "columns" | "hidden" | "withQueryStore" | "action" | "row"
		>
		& cn.WithClass;
}

export const Header = <
	TColumns extends string,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>(
	{
		withQueryStore,
		action,
		row,
		render,
		columns,
		hidden = [],
		cx,
	}: Header.Props<TColumns, TQuerySchema, TSchema>
) => {
	const Action = action;

	return <thead
		className={cn(
			"text-xs text-slate-700 border-b border-t border-slate-300",
			"select-none",
			"bg-slate-50",
			cx,
		)}
	>
		<tr>
			{(Action || row) && <th
				className={"w-0"}
			>
				{Action && <Action/>}
			</th>}
			{columns?.filter(column => !hidden?.includes(column))?.map(column => {
				const $render = render[column];
				return $render ? <Sort
					key={`table-column-header-${column}`}
					withQueryStore={withQueryStore}
					{...$render}
				/> : null;
			})}
		</tr>
	</thead>;
};
