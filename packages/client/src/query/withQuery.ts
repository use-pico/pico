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
import { cleanOf } from "@use-pico/common/clean-of";
import type { withInvalidator } from "../invalidator/withInvalidator";

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
	 * Query options type excluding queryKey and queryFn (which are handled internally).
	 *
	 * @template TResult - Result type returned by the query function.
	 */
	export type QueryOptions<TResult> = OmitKeyof<
		UseQueryOptions<TResult, Error>,
		"queryKey" | "queryFn"
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
	/**
	 * Internal key generator function that cleans and formats query keys.
	 * @param data - Optional input data for the query.
	 * @returns The cleaned query key.
	 */
	const $keys = (data?: TData) => {
		return cleanOf(keys(data)) as QueryKey;
	};

	/**
	 * Creates query options for React Query.
	 * @param data - The input data for the query.
	 * @param opts - Optional query options to pass to queryOptions.
	 * @returns Query options object compatible with TanStack Query.
	 */
	const options = (data: TData, opts?: withQuery.QueryOptions<TResult>) => {
		const queryKey = $keys(data);

		return queryOptions<TResult, Error, TResult, QueryKey>({
			queryKey,
			queryFn: () => queryFn(data),
			...opts,
		});
	};

	/**
	 * Invalidates queries matching the query key.
	 * @param queryClient - The React Query client instance.
	 * @param data - Optional input data for the query to invalidate.
	 * @returns Promise that resolves when invalidation is complete.
	 */
	const invalidate = async (queryClient: QueryClient, data?: TData) => {
		return queryClient.invalidateQueries({
			queryKey: $keys(data),
			refetchType: "all",
		});
	};

	return {
		/**
		 * Returns the key generator function for the query.
		 * @param data - Optional input data for the query.
		 * @returns The cleaned query key.
		 */
		keys: $keys,
		/**
		 * Returns the queryOptions object for use with React Query hooks.
		 * @param data - The input data for the query.
		 * @param opts - Optional query options to pass to queryOptions.
		 * @returns Query options object compatible with TanStack Query.
		 */
		options,
		/**
		 * React Query hook for fetching data (non-suspense).
		 * @param data - The input data for the query.
		 * @param opts - Optional query options to override defaults.
		 * @returns The result of the query.
		 */
		useQuery(
			data: TData,
			opts?: withQuery.QueryOptions<TResult>,
		): UseQueryResult<TResult, Error> {
			return useQuery(options(data, opts));
		},
		/**
		 * React Query hook for fetching data with suspense.
		 * @param data - The input data for the query.
		 * @param opts - Optional query options to override defaults.
		 * @returns The result of the query (suspense-enabled).
		 */
		useSuspenseQuery(
			data: TData,
			opts?: withQuery.QueryOptions<TResult>,
		): UseSuspenseQueryResult<TResult, Error> {
			return useSuspenseQuery(options(data, opts));
		},
		/**
		 * Directly call query function. There is no caching or other logic here.
		 * @param data - The input data for the query.
		 * @returns Promise resolving to the query result.
		 */
		async query(data: TData) {
			return queryFn(data);
		},
		/**
		 * React Query hook for invalidating the query.
		 * @param data - Optional input data for the query to invalidate.
		 * @returns A function to invalidate the query.
		 */
		useInvalidate(data?: TData) {
			const queryClient = useQueryClient();

			/**
			 * Invalidate the pre-configured query.
			 * @returns Promise that resolves when invalidation is complete.
			 */
			return async () => {
				return invalidate(queryClient, data);
			};
		},
		/**
		 * Invalidate the pre-configured query.
		 *
		 * For use in a component you can use useInvalidate on this object.
		 * @param queryClient - The React Query client instance.
		 * @param data - Optional input data for the query to invalidate.
		 * @returns Promise that resolves when invalidation is complete.
		 */
		invalidate,
		/**
		 * Invalidate the pre-configured query using data in it's key.
		 *
		 * For use in a component you can use useInvalidate on this object.
		 *
		 * This is useful when you want invalidate e.g. user with an ID:
		 * Key is ['user', id], so you can call `invalidateData(id)`
		 * @param data - The input data for the query to invalidate.
		 * @returns Invalidator object with an invalidate method.
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
		 * @param data - The input data for the query.
		 * @returns Promise that resolves when prefetching is complete.
		 */
		async prefetch(
			queryClient: QueryClient,
			data: TData,
			opts?: withQuery.QueryOptions<TResult>,
		) {
			await queryClient.prefetchQuery(options(data, opts));
		},
		/**
		 * Ensures the query data is available in the cache, fetching if necessary.
		 * @param queryClient - The React Query client instance.
		 * @param data - The input data for the query.
		 * @param opts - Optional query options to pass to queryOptions.
		 * @returns Resolves with the query data.
		 */
		async ensure(
			queryClient: QueryClient,
			data: TData,
			opts?: withQuery.QueryOptions<TResult>,
		) {
			return queryClient.ensureQueryData(options(data, opts));
		},
		/**
		 * React Query hook for manually setting query data in the cache.
		 * @returns A function to set query data.
		 */
		useSet() {
			const queryClient = useQueryClient();
			/**
			 * Sets the query data in the cache.
			 * @param value - The value to set in the cache.
			 * @param data - Optional input data for the query.
			 */
			return (value: TResult | undefined, data?: TData) => {
				queryClient.setQueryData($keys(data), value);
			};
		},
	} as const;
}
