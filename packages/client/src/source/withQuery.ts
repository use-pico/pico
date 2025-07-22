import {
	type QueryClient,
	type QueryKey,
	queryOptions,
	type UseQueryResult,
	type UseSuspenseQueryResult,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

export namespace withQuery {
	/**
	 * Props for configuring a generic query.
	 *
	 * @template TData - Input data type for the query.
	 * @template TResult - Result type returned by the query function.
	 */
	export interface Props<TData, TResult> {
		/**
		 * Input data for the query. Also should be used as a key for the query (goes into keys() method).
		 */
		data: TData;
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
		keys(data: TData): QueryKey;
	}

	export type PropsEx<TData, TResult> = Omit<
		Props<TData, TResult>,
		"queryFn" | "keys"
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
	data,
	queryFn,
	keys,
}: withQuery.Props<TData, TResult>) {
	const queryKey = keys(data);

	const query = queryOptions<TResult, Error, TResult, QueryKey>({
		queryKey,
		queryFn: () => queryFn(data),
	});
	const invalidate = async (queryClient: QueryClient) => {
		return queryClient.invalidateQueries({
			queryKey,
			refetchType: "all",
		});
	};

	return {
		/**
		 * Returns the key generator function for the query.
		 */
		keys,
		/**
		 * Returns the queryOptions object for use with React Query hooks.
		 */
		query,
		/**
		 * React Query hook for fetching data (non-suspense).
		 * @returns The result of the query.
		 */
		useQuery(): UseQueryResult<TResult, Error> {
			return useQuery(query);
		},
		/**
		 * React Query hook for fetching data with suspense.
		 * @returns The result of the query (suspense-enabled).
		 */
		useSuspenseQuery(): UseSuspenseQueryResult<TResult, Error> {
			return useSuspenseQuery(query);
		},
		/**
		 * React Query hook for invalidating the query.
		 * @returns A function to invalidate the query.
		 */
		useInvalidate() {
			const queryClient = useQueryClient();

			/**
			 * Invalidate the pre-configured query.
			 */
			return async () => {
				return invalidate(queryClient);
			};
		},
		/**
		 * Invalidate the pre-configured query.
		 *
		 * For use in a component you can use useInvalidate on this object.
		 */
		invalidate,
		/**
		 * Prefetches the query using the provided QueryClient.
		 * Useful for loading data into the cache before rendering.
		 * @param queryClient - The React Query client instance.
		 * @returns Resolves when prefetching is complete.
		 */
		async prefetch(queryClient: QueryClient) {
			await queryClient.prefetchQuery(query);
		},
		/**
		 * Ensures the query data is available in the cache, fetching if necessary.
		 * @param queryClient - The React Query client instance.
		 * @returns Resolves with the query data.
		 */
		async ensure(queryClient: QueryClient) {
			return queryClient.ensureQueryData(query);
		},
	} as const;
}
