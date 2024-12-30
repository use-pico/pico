import {
    useMutation,
    type QueryClient,
    type UseMutationResult,
} from "@tanstack/react-query";
import {
    withRepository as withCoolRepository,
    type CountSchema,
    type CursorSchema,
    type withRepositorySchema,
} from "@use-pico/common";

export namespace withRepository {
	export interface Props<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> extends withCoolRepository.Props<TSchema> {
		name: string;
	}

	export namespace Instance {
		export namespace withFetchLoader {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				queryClient: QueryClient;
				where?: withRepositorySchema.Filter<TSchema>;
				filter?: withRepositorySchema.Filter<TSchema>;
				cursor?: CursorSchema.Type;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Instance.withFetchLoader.Props<TSchema>,
			) => Promise<withRepositorySchema.Output<TSchema>>;
		}

		export namespace withListLoader {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				queryClient: QueryClient;
				where?: withRepositorySchema.Filter<TSchema>;
				filter?: withRepositorySchema.Filter<TSchema>;
				cursor?: CursorSchema.Type;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Instance.withListLoader.Props<TSchema>,
			) => Promise<withRepositorySchema.Output<TSchema>[]>;
		}

		export namespace withCountLoader {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				queryClient: QueryClient;
				where?: withRepositorySchema.Filter<TSchema>;
				filter?: withRepositorySchema.Filter<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Instance.withCountLoader.Props<TSchema>,
			) => Promise<CountSchema.Type>;
		}

		export namespace usePatchMutation {
			export namespace toPatch {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					shape: withRepositorySchema.Shape<TSchema>;
				}

				export interface Response<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					shape: withRepositorySchema.Shape<TSchema>;
					filter: withRepositorySchema.Filter<TSchema>;
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TSchema>) => Promise<Response<TSchema>>;
			}

			export namespace onSuccess {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					entity: withRepositorySchema.Entity<TSchema>;
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TSchema>) => Promise<void>;
			}

			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				toPatch: toPatch.Callback<TSchema>;
				onSuccess?: onSuccess.Callback<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => UseMutationResult<
				withRepositorySchema.Output<TSchema>,
				Error,
				withRepositorySchema.Shape<TSchema>
			>;
		}
	}

	export interface Instance<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> extends withCoolRepository.Instance<TSchema> {
		name: string;

		withFetchLoader: Instance.withFetchLoader.Callback<TSchema>;
		withListLoader: Instance.withListLoader.Callback<TSchema>;
		withCountLoader: Instance.withCountLoader.Callback<TSchema>;

		usePatchMutation: Instance.usePatchMutation.Callback<TSchema>;
	}
}

/**
 * Extended client-side repository support.
 */
export const withRepository = <
	TSchema extends withRepositorySchema.Instance<any, any, any>,
>({
	name,
	...props
}: withRepository.Props<TSchema>): withRepository.Instance<TSchema> => {
	const $coolInstance = withCoolRepository(props);

	const $instance: withRepository.Instance<TSchema> = {
		...$coolInstance,

		name,

		async withListLoader({
			queryClient,
			where,
			filter,
			cursor = { page: 0, size: 10 },
		}) {
			return queryClient.ensureQueryData({
				queryKey: ["withListLoader", name, { where, filter, cursor }],
				async queryFn() {
					return $coolInstance.list({ query: { where, filter, cursor } });
				},
			});
		},
		async withFetchLoader({ queryClient, where, filter, cursor }) {
			return queryClient.ensureQueryData({
				queryKey: ["withFetchLoader", name, { where, filter, cursor }],
				async queryFn() {
					return $coolInstance.fetch({ query: { where, filter, cursor } });
				},
			});
		},
		async withCountLoader({ queryClient, where, filter }) {
			return queryClient.ensureQueryData({
				queryKey: ["withCountLoader", name, { where, filter }],
				async queryFn() {
					return $coolInstance.count({ query: { where, filter } });
				},
			});
		},

		usePatchMutation({ toPatch, onSuccess }) {
			return useMutation({
				mutationKey: ["usePatchMutation", name],
				async mutationFn({ shape }) {
					const patch = await toPatch({
						shape,
					});

					const entity = $coolInstance.patch(patch);

					await onSuccess?.({ entity });

					return entity;
				},
			});
		},
	};

	return $instance;
};
