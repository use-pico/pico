import {
	type DefaultError,
	type InfiniteData,
	type QueryClient,
	type QueryKey,
	type UndefinedInitialDataInfiniteOptions,
	useInfiniteQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { cleanOf } from "@use-pico/common/clean-of";
import type { EntitySchema } from "@use-pico/common/schema";

export namespace withInfiniteQuery {
	export interface Cursor {
		page: number;
		signal: AbortSignal;
	}

	export interface Collection<TItem extends EntitySchema.Type> {
		data: TItem[];
		more: boolean;
	}

	export interface Props<
		TData,
		TItem extends EntitySchema.Type,
		TResult extends Collection<TItem>,
	> {
		/**
		 * Function to generate the query key for React Query.
		 * @param data - The input data for the query.
		 * @returns The query key.
		 */
		keys(data?: TData): QueryKey;
		/**
		 * Function to fetch/query data based on the input data.
		 * @param data - The input data for the query.
		 * @returns A promise resolving to the query result.
		 */
		queryFn(data: TData & Cursor): Promise<TResult>;
	}

	export type Options<
		TItem extends EntitySchema.Type,
		TResult extends Collection<TItem>,
		TSelect = InfiniteData<TResult>,
		TQueryKey extends QueryKey = QueryKey,
	> = Omit<
		UndefinedInitialDataInfiniteOptions<
			TResult,
			DefaultError,
			TSelect,
			TQueryKey,
			number
		>,
		"queryKey" | "queryFn" | "getNextPageParam"
	>;

	export type Api<
		TData,
		TItem extends EntitySchema.Type,
		TResult extends Collection<TItem>,
	> = ReturnType<typeof withInfiniteQuery<TData, TItem, TResult>>;
}

export function withInfiniteQuery<
	TData,
	TItem extends EntitySchema.Type,
	TResult extends withInfiniteQuery.Collection<TItem>,
>({ keys, queryFn }: withInfiniteQuery.Props<TData, TItem, TResult>) {
	/**
	 * Internal key generator function that cleans and formats query keys.
	 * @param data - Optional input data for the query.
	 * @returns The cleaned query key.
	 */
	const $keys = (data?: TData) => {
		return cleanOf(keys(data)) as QueryKey;
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
		useInfiniteQuery(
			data: TData,
			options: withInfiniteQuery.Options<TItem, TResult>,
		) {
			return useInfiniteQuery({
				queryKey: $keys(data),
				queryFn({ pageParam, signal }) {
					return queryFn({
						page: pageParam,
						signal,
						...data,
					});
				},
				getNextPageParam: (lastPage, _pages, lastPageParam) => {
					return lastPage.more ? lastPageParam + 1 : undefined;
				},
				...options,
			});
		},
		/**
		 * Directly call query function. There is no caching or other logic here.
		 * @param data - The input data for the query.
		 * @returns Promise resolving to the query result.
		 */
		async query(data: TData & withInfiniteQuery.Cursor) {
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
		useReplace(data: TData) {
			const queryClient = useQueryClient();

			return (item: TItem) => {
				return queryClient.setQueryData<InfiniteData<TResult>>(
					$keys(data),
					(old) => {
						if (!old) {
							return old;
						}

						return {
							...old,
							pages: old.pages.map((page) => {
								return {
									...page,
									data: page.data.map((oldItem) => {
										return oldItem.id === item.id
											? item
											: oldItem;
									}),
								};
							}),
						};
					},
				);
			};
		},
		usePatch(data: TData) {
			const queryClient = useQueryClient();

			return (item: Partial<TItem> & EntitySchema.Type) => {
				return queryClient.setQueryData<InfiniteData<TResult>>(
					$keys(data),
					(old) => {
						if (!old) {
							return old;
						}

						return {
							...old,
							pages: old.pages.map((page) => {
								return {
									...page,
									data: page.data.map((oldItem) => {
										if (oldItem.id === item.id) {
											return {
												...oldItem,
												...item,
											};
										}

										return oldItem;
									}),
								};
							}),
						};
					},
				);
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
	} as const;
}
