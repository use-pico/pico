import type { CountSchema, CursorSchema, FilterSchema } from "@use-pico/common";
import type { Cursor } from "../cursor/Cursor";
import type { withQuery } from "../source/withQuery";
import { Table } from "./Table";

export namespace QueryTable {
	export interface Request {
		filter?: FilterSchema.Type | null;
		cursor?: CursorSchema.Type | null;
	}

	/**
	 * Props for the QueryTable component that combines React Query data fetching with table display.
	 *
	 * @template TRequest - The request parameters type (e.g., search filters, pagination)
	 * @template TData - The data type for table rows, must extend Table.Data
	 * @template TContext - Optional context type for table operations
	 */
	export interface Props<
		TRequest extends Request,
		TData extends Table.Data,
		TContext = any,
	> extends Omit<Table.Props<TData, TContext>, "data" | "cursor"> {
		/**
		 * The typed query API instance that handles data fetching, caching, and invalidation.
		 * This provides the useQuery hook and other query-related utilities.
		 *
		 * @example
		 * ```typescript
		 * const userQuery = withQuery<UserFilters, User[]>({
		 *   queryFn: (filters) => fetchUsers(filters),
		 *   keys: (filters) => ['users', filters]
		 * });
		 *
		 * <QueryTable withQuery={userQuery} request={filters} />
		 * ```
		 */
		withQuery: withQuery.Api<TRequest, TData[]>;
		withCountQuery: withQuery.Api<TRequest, CountSchema.Type>;
		cursor?: Omit<Cursor.Props, "count" | "cursor">;

		/**
		 * The request parameters that will be passed to the query function.
		 * This prop is reactive - when it changes, the query key is automatically
		 * recomputed and new data is fetched from the server.
		 *
		 * React Query will handle the data fetching, caching, and loading states
		 * automatically based on changes to this request object.
		 *
		 * @example
		 * ```typescript
		 * // Initial request
		 * <QueryTable withQuery={userQuery} request={{ page: 1, limit: 10 }} />
		 *
		 * // When request changes, new data is automatically fetched
		 * <QueryTable withQuery={userQuery} request={{ page: 2, limit: 10 }} />
		 * ```
		 */
		request: TRequest;
	}

	export type PropsEx<
		TRequest extends Request,
		TData extends Table.Data,
		TContext = any,
	> = Omit<
		Props<TRequest, TData, TContext>,
		"columns" | "withQuery" | "withCountQuery"
	>;
}

export const QueryTable = <
	TRequest extends QueryTable.Request,
	TData extends Table.Data,
	TContext = any,
>({
	withQuery,
	withCountQuery,
	request,
	cursor,
	...props
}: QueryTable.Props<TRequest, TData, TContext>) => {
	const queryResult = withQuery.useQuery(request);
	const countResult = withCountQuery.useQuery(request);

	return (
		<Table<TData, TContext>
			loading={
				queryResult.isLoading
					? "loading"
					: queryResult.isFetching
						? "fetching"
						: undefined
			}
			data={queryResult.data}
			cursor={
				cursor && request.cursor
					? {
							count: countResult.data ?? {
								total: 0,
								filter: 0,
								where: 0,
							},
							cursor: request.cursor,
							...cursor,
						}
					: undefined
			}
			{...props}
		/>
	);
};
