import {
	type OmitKeyof,
	type QueryClient,
	type QueryKey,
	queryOptions,
	type UseQueryOptions,
	type UseQueryResult,
	type UseSuspenseQueryResult,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { cleanOf } from "@use-pico/common";
import type { withInvalidator } from "./withInvalidator";

export namespace withQuery {
	/**
	 * Props for configuring a generic query.
	 *
	 * @template TData - Input data type for the query.
	 * @template TResult - Result type returned by the query function.
	 */
	export interface Props<TData, TResult> {
		/**
		 * Function to fetch/query data based on the input data.
		 * @param data - The input data for the query.
		 * @returns A promise resolving to the query result.
		 */
		queryFn(data: TData): Promise<TResult>;
		/**
		 * Function to generate the query key for React Query.
		 * @param data - The input data for the query.
		 * @returns The query key.
		 */
		keys(data?: TData): QueryKey;
	}

	export type PropsEx<TData, TResult> = Omit<
		Props<TData, TResult>,
		"queryFn" | "keys"
	>;

	/**
	 * Typed public facing API for query operations.
	 *
	 * The `Api` type represents the complete interface returned by `withQuery()`,
	 * providing a strongly-typed, consistent API for all query-related operations.
	 * This type ensures that consumers have access to a predictable set of methods
	 * for data fetching, caching, and invalidation.
	 *
	 * @template TData - Input data type for the query (e.g., user ID, search parameters)
	 * @template TResult - Result type returned by the query function (e.g., User, SearchResults)
	 *
	 * @example
	 * ```typescript
	 * // Define a query API for fetching user data
	 * const userQuery = withQuery<UserId, User>({
	 *   queryFn: (userId) => fetchUser(userId),
	 *   keys: (userId) => ['user', userId]
	 * });
	 *
	 * // The userQuery object is typed as Api<UserId, User>
	 * // This provides full type safety for all operations
	 * ```
	 *
	 * The API includes:
	 * - **Query execution**: `query()`, `useQuery()`, `useSuspenseQuery()` (pure TanStack Query under the hood)
	 * - **Cache management**: `invalidate()`, `useInvalidate()`, `invalidateData()`
	 * - **Data prefetching**: `prefetch()`, `ensure()` (bound to TanStack Query's prefetchQuery and ensureQueryData)
	 * - **Key generation**: `keys()`
	 *
	 * This type serves as the contract between query definitions and their consumers,
	 * ensuring that all query operations are properly typed and consistent across
	 * the application. The implementation is pure TanStack Query, providing full
	 * compatibility with all TanStack Query features and behaviors.
	 */
	export type Api<TData, TResult> = ReturnType<
		typeof withQuery<TData, TResult>
	>;
}

/**
 * Generic query utility for React Query.
 *
 * Wraps a query function and key generator, returning helpers for useQuery and useSuspenseQuery.
 *
 * @template TData - Input data type for the query.
 * @template TResult - Result type returned by the query function.
 * @param props - Query configuration and helpers.
 * @returns Query helpers and hooks.
 */
export function withQuery<TData, TResult>({
	queryFn,
	keys,
}: withQuery.Props<TData, TResult>) {
	const $keys = (data?: TData) => {
		return cleanOf(keys(data)) as QueryKey;
	};

	const query = (data: TData) => {
		const queryKey = $keys(data);

		return queryOptions<TResult, Error, TResult, QueryKey>({
			queryKey,
			queryFn: () => queryFn(data),
		});
	};

	const invalidate = async (queryClient: QueryClient, data?: TData) => {
		return queryClient.invalidateQueries({
			queryKey: $keys(data),
			refetchType: "all",
		});
	};

	return {
		/**
		 * Returns the key generator function for the query.
		 */
		keys: $keys,
		/**
		 * Returns the queryOptions object for use with React Query hooks.
		 */
		query,
		/**
		 * React Query hook for fetching data (non-suspense).
		 * @returns The result of the query.
		 */
		useQuery(
			data: TData,
			options?: OmitKeyof<
				UseQueryOptions<TResult, Error>,
				"queryKey" | "queryFn"
			>,
		): UseQueryResult<TResult, Error> {
			return useQuery({
				...query(data),
				...options,
			});
		},
		/**
		 * React Query hook for fetching data with suspense.
		 * @returns The result of the query (suspense-enabled).
		 */
		useSuspenseQuery(
			data: TData,
			options?: OmitKeyof<
				UseQueryOptions<TResult, Error>,
				"queryKey" | "queryFn"
			>,
		): UseSuspenseQueryResult<TResult, Error> {
			return useSuspenseQuery({
				...query(data),
				...options,
			});
		},
		/**
		 * React Query hook for invalidating the query.
		 * @returns A function to invalidate the query.
		 */
		useInvalidate(data?: TData) {
			const queryClient = useQueryClient();

			/**
			 * Invalidate the pre-configured query.
			 */
			return async () => {
				return invalidate(queryClient, data);
			};
		},
		/**
		 * Invalidate the pre-configured query.
		 *
		 * For use in a component you can use useInvalidate on this object.
		 */
		invalidate,
		/**
		 * Invalidate the pre-configured query using data in it's key.
		 *
		 * For use in a component you can use useInvalidate on this object.
		 *
		 * This is useful when you want invalidate e.g. user with an ID:
		 * Key is ['user', id], so you can call `invalidateData(id)`
		 */
		invalidateData(data: TData): withInvalidator.Invalidate {
			return {
				async invalidate(queryClient: QueryClient) {
					return invalidate(queryClient, data);
				},
			};
		},
		/**
		 * Prefetches the query using the provided QueryClient.
		 * Useful for loading data into the cache before rendering.
		 * @param queryClient - The React Query client instance.
		 * @returns Resolves when prefetching is complete.
		 */
		async prefetch(queryClient: QueryClient, data: TData) {
			await queryClient.prefetchQuery(query(data));
		},
		/**
		 * Ensures the query data is available in the cache, fetching if necessary.
		 * @param queryClient - The React Query client instance.
		 * @returns Resolves with the query data.
		 */
		async ensure(queryClient: QueryClient, data: TData) {
			return queryClient.ensureQueryData(query(data));
		},
	} as const;
}
