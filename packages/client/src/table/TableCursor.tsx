import type { CountSchema, withQuerySchema } from "@use-pico/common";
import { Cursor as CoolCursor } from "../cursor/Cursor";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import type { withQuery } from "../source/withQuery";

export namespace TableCursor {
	export interface Props<TQuery extends withQuerySchema.Query> {
		withCountQuery: withQuery.Api<TQuery, CountSchema.Type>;
		cursor: CoolCursor.State;
		query: TQuery;
	}
}

export const TableCursor = <TQuery extends withQuerySchema.Query>({
	cursor,
	withCountQuery,
	query,
}: TableCursor.Props<TQuery>) => {
	const { data, isSuccess, isLoading, isFetching, isError } =
		withCountQuery.useQuery(query);

	if (isError) {
		return null;
	}

	if (!query.cursor) {
		return null;
	}

	if (isLoading) {
		return <Icon icon={LoaderIcon} />;
	}

	if (!isSuccess) {
		return null;
	}

	return (
		<CoolCursor
			cls={{
				base: isFetching
					? [
							"opacity-50",
						]
					: undefined,
			}}
			state={cursor}
			count={data}
		/>
	);
};
