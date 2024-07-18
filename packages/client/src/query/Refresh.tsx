import {
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema
} from "@use-pico/common";
import { LoaderIcon } from "../icon/LoaderIcon";
import { RefreshIcon } from "../icon/RefreshIcon";
import { Table } from "../table/Table";
import { Action } from "../ui/Action";
import { useCount } from "./useCount";
import { useSourceQuery } from "./useSourceQuery";

export namespace Refresh {
	export interface Props<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Pick<
		Table.Props<TColumns, TQuerySchema, TSchema>,
		"withSourceQuery" | "withQueryStore" | "refresh"
	> {
	}
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
		withSourceQuery,
		refetchInterval: refresh,
	});
	const count = useCount({
		store:           withQueryStore,
		withSourceQuery,
		refetchInterval: refresh,
	});

	return <Action
		icon={{
			enabled:  RefreshIcon,
			disabled: RefreshIcon,
			loading:  LoaderIcon,
		}}
		css={[
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
