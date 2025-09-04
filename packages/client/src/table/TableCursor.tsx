import type { CountSchema, withQuerySchema } from "@use-pico/common";
import { Cursor as CoolCursor } from "../cursor/Cursor";
import { Data } from "../data/Data";
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
	query: { filter, where },
}: TableCursor.Props<TQuery>) => {
	const countQuery = withCountQuery.useQuery({
		/**
		 * This is a trick - count needs only filters, sort and so on is not necessary
		 */
		filter,
		where,
	} as TQuery);

	return (
		<Data<CountSchema.Type, typeof countQuery>
			result={countQuery}
			renderError={() => null}
			renderLoading={() => null}
			renderSuccess={({ data }) => (
				<CoolCursor
					state={cursor}
					count={data}
				/>
			)}
		/>
	);
};
