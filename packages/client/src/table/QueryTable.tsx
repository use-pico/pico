import type { withQuery } from "../source/withQuery";
import { Table } from "./Table";

export namespace QueryTable {
	/**
	 * Props for the QueryTable component that combines React Query data fetching with table display.
	 *
	 * @template TRequest - The request parameters type (e.g., search filters, pagination)
	 * @template TData - The data type for table rows, must extend Table.Data
	 * @template TContext - Optional context type for table operations
	 */
	export interface Props<TRequest, TData extends Table.Data, TContext = any>
		extends Omit<Table.Props<TData, TContext>, "data"> {
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
}

export const QueryTable = <TRequest, TData extends Table.Data, TContext = any>({
	withQuery,
	...props
}: QueryTable.Props<TRequest, TData, TContext>) => {
	const { data, isLoading, isFetching } = withQuery.useQuery(props.request);
	return (
		<Table<TData, TContext>
			loading={
				isLoading ? "loading" : isFetching ? "fetching" : undefined
			}
			data={data}
			{...props}
		/>
	);
};
