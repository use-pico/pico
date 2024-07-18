import {
	Css,
	cssOf,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema
}              from "@use-pico/common";
import {Sort}  from "./Sort";
import {Table} from "./Table";

export namespace Header {
	export interface Props<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Pick<
		Table.Props<TColumns, TQuerySchema, TSchema>,
		"render" | "columns" | "hidden" | "withQueryStore" | "action" | "row"
	>, Css.Style {
	}
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
		css,
	}: Header.Props<TColumns, TQuerySchema, TSchema>
) => {
	const Action = action;

	return <thead
		className={cssOf(
			"text-xs text-slate-700 border-b border-t border-slate-300",
			"select-none",
			"bg-slate-50",
			css,
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
