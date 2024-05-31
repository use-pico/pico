import {
	cn,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema
}                       from "@use-pico/common";
import {LoaderIcon}     from "../icon/LoaderIcon";
import {RefreshIcon}    from "../icon/RefreshIcon";
import {useCount}       from "../query/useCount";
import {useSourceQuery} from "../query/useSourceQuery";
import {Action}         from "../ui/Action";
import {Table}          from "./Table";

export namespace Refresh {
	export type Props<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> =
		Pick<
			Table.Props<TColumns, TQuerySchema, TSchema>,
			"withSourceQuery" | "withQueryStore" | "refresh"
		>
		& cn.WithClass;
}

export const Refresh = <
	TColumns extends string,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>(
	{
		withQueryStore,
		withSourceQuery,
		refresh,
	}: Refresh.Props<TColumns, TQuerySchema, TSchema>
) => {
	const data = useSourceQuery({
		store:           withQueryStore,
		withSourceQuery: withSourceQuery,
		refetchInterval: refresh,
	});
	const count = useCount({
		store: withQueryStore,
		withSourceQuery: withSourceQuery,
		refetchInterval: refresh,
	});

	return <Action
		icon={{
			enabled: RefreshIcon,
			disabled: RefreshIcon,
			loading: LoaderIcon,
		}}
		cx={[
			"text-sky-500",
		]}
		disabled={data.isFetching || count.isFetching}
		loading={data.isFetching || count.isFetching}
		onClick={() => {
			data.refetch();
			count.refetch();
		}}
	/>;
};
