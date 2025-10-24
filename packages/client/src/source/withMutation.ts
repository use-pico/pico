import {
	type QueryClient,
	type QueryKey,
	type UseMutationOptions,
	type UseMutationResult,
	useIsMutating,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { withInvalidator } from "./withInvalidator";

export namespace withMutation {
	export interface Meta {
		mutationId?: string;
	}

	export namespace PostMutation {
		export interface Props<TVariables, TResult> {
			variables: TVariables;
			result: TResult;
		}

		export type Fn<TVariables, TResult> = (
			props: Props<TVariables, TResult>,
		) => Promise<TResult>;
	}

	/**
	 * Props for configuring a generic mutation utility.
	 *
	 * @template TVariables - Input data type for the mutation.
	 * @template TResult - Result type returned by the mutation function.
	 *
	 * @property mutationFn - The function that performs the mutation. Receives variables and returns a promise of the result.
	 * @property keys - Function to generate a query key for cache invalidation, based on the mutation variables.
	 * @property invalidator - Optional array of functions that, when called, perform additional invalidation logic using the QueryClient. Each function is awaited in sequence.
	 */
	export interface Props<TVariables, TResult> {
		/**
		 * Function to perform the mutation.
		 * @param variables - The input data for the mutation.
		 * @returns A promise resolving to the mutation result.
		 */
		mutationFn(variables: TVariables): Promise<TResult>;
		/**
		 * Function to generate the query key for cache invalidation, based on the mutation variables.
		 * @param variables - The input data for the mutation.
		 * @returns The query key.
		 */
		keys(variables?: TVariables): QueryKey;
		/**
		 * Optional array of invalidator functions. Each receives the QueryClient and is awaited in sequence when invalidation is triggered.
		 */
		invalidate?: withInvalidator.Invalidate[];
	}

	export type UseOptions<TVariables, TResult, TContext = unknown> = Omit<
		UseMutationOptions<TResult, Error, TVariables, TContext>,
		"mutationFn" | "mutationKey"
	> & {
		meta?: Meta;
		/**
		 * Optional callback called right _after_ mutationFn - this blocking the mutation itself (it's not a onSuccess callback)
		 */
		onPostMutation?: PostMutation.Fn<TVariables, TResult>;
	};

	export type PropsEx<TVariables, TResult> = Omit<
		Props<TVariables, TResult>,
		"mutationFn" | "keys" | "invalidate"
	>;
}

/**
 * Generic mutation utility for React Query.
 *
 * Wraps a mutation function, a key generator, and optional invalidators, returning helpers for useMutation and cache invalidation.
 *
 * @template TVariables - Input data type for the mutation.
 * @template TResult - Result type returned by the mutation function.
 * @param props - Mutation configuration and helpers.
 * @returns An object with:
 *   - keys: The key generator function for cache invalidation.
 *   - useMutation: A hook to perform the mutation (wraps React Query's useMutation).
 *   - useInvalidate: A hook returning a function that runs all invalidators with the current QueryClient.
 *   - invalidate: A function to run all invalidators with a provided QueryClient (for non-hook usage).
 */
export function withMutation<TVariables, TResult>({
	mutationFn,
	keys,
	invalidate: $invalidate = [],
}: withMutation.Props<TVariables, TResult>) {
	const { invalidate } = withInvalidator({
		invalidate: $invalidate,
	});

	return {
		/**
		 * Returns the key generator function for the mutation.
		 */
		keys,
		/**
		 * React Query hook for performing the mutation.
		 * @param options - Optional mutation options (same as React Query's useMutation options, except mutationFn is always provided by this utility).
		 * @returns The result of the mutation hook.
		 */
		useMutation<TContext = unknown>(
			options?: withMutation.UseOptions<TVariables, TResult, TContext>,
		): UseMutationResult<TResult, Error, TVariables, TContext> {
			const { onSuccess, onPostMutation, ...$options } = options ?? {};
			const queryClient = useQueryClient();

			return useMutation<TResult, Error, TVariables, TContext>({
				mutationKey: keys(),
				async mutationFn(variables) {
					const result = await mutationFn(variables);
					await onPostMutation?.({
						variables,
						result,
					});
					return result;
				},
				...$options,
				async onSuccess(data, variables, result, context) {
					await invalidate(queryClient);
					onSuccess?.(data, variables, result, context);
				},
			});
		},
		useIsMutating({ mutationId }: withMutation.Meta = {}) {
			const count = useIsMutating({
				mutationKey: keys(),
				predicate: mutationId
					? ({ options: { meta } }) =>
							(meta as withMutation.Meta)?.mutationId ===
							mutationId
					: undefined,
			});

			return count > 0;
		},
		/**
		 * Directly call mutation function and invalidate cache; there are no hooks or other logic here.
		 *
		 * @param queryClient
		 * @param variables
		 * @returns
		 */
		async mutate(queryClient: QueryClient, variables: TVariables) {
			const data = await mutationFn(variables);
			await invalidate(queryClient);
			return data;
		},
		/**
		 * React Query hook for invalidating queries related to the mutation.
		 * @returns A function that, when called, runs all invalidators with the current QueryClient.
		 */
		useInvalidate() {
			const queryClient = useQueryClient();
			return async () => {
				return invalidate(queryClient);
			};
		},
		/**
		 * Invalidate queries related to the mutation by running all invalidators with the provided QueryClient.
		 *
		 * For use outside React components. For component usage, prefer useInvalidate.
		 */
		invalidate,
	} as const;
}
