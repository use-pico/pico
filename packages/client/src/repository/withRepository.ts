import {
    useMutation,
    useQuery,
    useQueryClient,
    type QueryClient,
    type QueryKey,
    type UseMutationResult,
    type UseQueryOptions,
    type UseQueryResult,
} from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
    withRepository as withCoolRepository,
    type CountSchema,
    type CursorSchema,
    type withRepositorySchema,
} from "@use-pico/common";
import type { Kysely, Transaction } from "kysely";
import { invalidator } from "../invalidator/invalidator";

export namespace withRepository {
	export interface Props<
		TDatabase,
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> extends withCoolRepository.Props<TDatabase, TSchema> {
		name: string;
		invalidate?: QueryKey[];
	}

	export namespace Instance {
		export namespace withFetchLoader {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				queryClient: QueryClient;
				where?: TSchema["~filter"];
				filter?: TSchema["~filter"];
				cursor?: CursorSchema.Type;
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Instance.withFetchLoader.Props<TDatabase, TSchema>,
			) => Promise<TSchema["~output"]>;
		}

		export namespace withListLoader {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				queryClient: QueryClient;
				where?: TSchema["~filter"];
				filter?: TSchema["~filter"];
				cursor?: CursorSchema.Type;
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Instance.withListLoader.Props<TDatabase, TSchema>,
			) => Promise<TSchema["~output"][]>;
		}

		export namespace withCountLoader {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				queryClient: QueryClient;
				where?: TSchema["~filter"];
				filter?: TSchema["~filter"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Instance.withCountLoader.Props<TDatabase, TSchema>,
			) => Promise<CountSchema.Type>;
		}

		export namespace withRouteListLoader {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				context: {
					queryClient: QueryClient;
				};
				deps: {
					global?: TSchema["~filter"];
					where?: TSchema["~filter"];
					filter?: TSchema["~filter"];
					cursor?: CursorSchema.Type;
				};
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = () => (
				props: Instance.withRouteListLoader.Props<TSchema>,
			) => Promise<withCoolRepository.List<TSchema["~output"]>>;
		}

		export namespace useListQuery {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: withCoolRepository.Query<TSchema>;
				options?: Omit<
					UseQueryOptions<withCoolRepository.List<TSchema["~output"]>, Error>,
					"queryKey" | "queryFn"
				>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => UseQueryResult<withCoolRepository.List<TSchema["~output"]>, Error>;
		}

		export namespace useCreateMutation {
			export namespace toCreate {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					shape: TSchema["~shape"];
				}

				export interface Response<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					entity: Partial<TSchema["~entity"]>;
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TSchema>) => Promise<Response<TSchema>>;
			}

			export namespace onSuccess {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					entity: TSchema["~entity"];
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TSchema>) => Promise<void>;
			}

			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				wrap?<T>(callback: () => Promise<T>): Promise<T>;
				toCreate?: toCreate.Callback<TSchema>;
				onSuccess?: onSuccess.Callback<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => UseMutationResult<TSchema["~output"], Error, TSchema["~shape"]>;
		}

		export namespace usePatchMutation {
			export namespace toPatch {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					shape: TSchema["~shape"];
				}

				export interface Response<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					entity?: Partial<TSchema["~entity"]>;
					filter: TSchema["~filter"];
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TSchema>) => Promise<Response<TSchema>>;
			}

			export namespace onSuccess {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					entity: TSchema["~entity"];
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TSchema>) => Promise<void>;
			}

			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				/**
				 * If you need to wrap promise of the mutation (e.g. loading toaster or something).
				 */
				wrap?<T>(callback: () => Promise<T>): Promise<T>;
				toPatch: toPatch.Callback<TSchema>;
				/**
				 * This success callback runs during mutation, so mutation keep locked unless it's resolved.
				 */
				onSuccess?: onSuccess.Callback<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => UseMutationResult<TSchema["~output"], Error, TSchema["~shape"]>;
		}

		export namespace useRemoveMutation {
			export namespace onSuccess {
				export interface Props {
					//
				}

				export type Callback = (props: Props) => Promise<void>;
			}

			export interface Props {
				wrap?<T>(callback: () => Promise<T>): Promise<T>;
				onSuccess?: onSuccess.Callback;
			}

			export type Callback = (
				props: Props,
			) => UseMutationResult<any, Error, { idIn?: string[] }>;
		}
	}

	export interface Instance<
		TDatabase,
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> extends withCoolRepository.Instance<TDatabase, TSchema> {
		name: string;
		invalidate: QueryKey[];

		withFetchLoader: Instance.withFetchLoader.Callback<TDatabase, TSchema>;
		withListLoader: Instance.withListLoader.Callback<TDatabase, TSchema>;
		withCountLoader: Instance.withCountLoader.Callback<TDatabase, TSchema>;
		/**
		 * @deprecated Improve API of this thing, I don't like it
		 */
		withRouteListLoader: Instance.withRouteListLoader.Callback<TSchema>;

		useListQuery: Instance.useListQuery.Callback<TSchema>;
		useCreateMutation: Instance.useCreateMutation.Callback<TSchema>;
		usePatchMutation: Instance.usePatchMutation.Callback<TSchema>;
		useRemoveMutation: Instance.useRemoveMutation.Callback;
	}

	export type Callback<
		TDatabase,
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> = (db: Kysely<TDatabase>) => Instance<TDatabase, TSchema>;
}

/**
 * Extended client-side repository support.
 */
export const withRepository = <
	TDatabase,
	TSchema extends withRepositorySchema.Instance<any, any, any>,
>({
	name,
	invalidate = [],
	...props
}: withRepository.Props<TDatabase, TSchema>): withRepository.Callback<
	TDatabase,
	TSchema
> => {
	const $factory = withCoolRepository(props);

	const $invalidate = [
		["withListLoader", name],
		["useListQuery", name],
		["withFetchLoader", name],
		["withCountLoader", name],
		...invalidate,
	];

	return (db) => {
		const $coolInstance = $factory(db);

		const $instance: withRepository.Instance<TDatabase, TSchema> = {
			...$coolInstance,

			name,
			invalidate: $invalidate,

			async withListLoader({
				tx,
				queryClient,
				where,
				filter,
				cursor = { page: 0, size: 10 },
			}) {
				return queryClient.ensureQueryData({
					queryKey: ["withListLoader", name, { where, filter, cursor }],
					async queryFn() {
						return $coolInstance.list({ tx, query: { where, filter, cursor } });
					},
				});
			},
			async withFetchLoader({ tx, queryClient, where, filter, cursor }) {
				return queryClient.ensureQueryData({
					queryKey: ["withFetchLoader", name, { where, filter, cursor }],
					async queryFn() {
						return $coolInstance.fetchOrThrow({
							tx,
							query: { where, filter, cursor },
						});
					},
				});
			},
			async withCountLoader({ tx, queryClient, where, filter }) {
				return queryClient.ensureQueryData({
					queryKey: ["withCountLoader", name, { where, filter }],
					async queryFn(): Promise<CountSchema.Type> {
						return $coolInstance.count({ tx, query: { where, filter } });
					},
				});
			},
			withRouteListLoader() {
				return async ({
					context: { queryClient },
					deps: { global, where, filter, cursor },
				}) => {
					return $coolInstance.db.transaction().execute(async (tx) => ({
						data: await $instance.withListLoader({
							tx,
							queryClient,
							where,
							filter: {
								...global,
								...filter,
							},
							cursor,
						}),
						count: await $instance.withCountLoader({
							tx,
							queryClient,
							where,
							filter: { ...global, ...filter },
						}),
					}));
				};
			},

			useListQuery({ query, options }) {
				return useQuery({
					queryKey: ["useListQuery", name, { query }],
					async queryFn(): Promise<
						withCoolRepository.List<TSchema["~output"]>
					> {
						return $coolInstance.db.transaction().execute(async (tx) => {
							return {
								data: await $coolInstance.list({ tx, query }),
								count: await $coolInstance.count({ tx, query }),
							};
						});
					},
					...options,
				});
			},

			useCreateMutation({
				wrap = async (callback) => callback(),
				toCreate = async ({ shape }) => ({ entity: shape, shape }),
				onSuccess,
			}) {
				const queryClient = useQueryClient();
				const router = useRouter();

				return useMutation({
					mutationKey: ["useCreateMutation", name],
					async mutationFn(shape) {
						return wrap(async () => {
							return $coolInstance.db.transaction().execute(async (tx) => {
								const entity = await $coolInstance.create({
									tx,
									...(await toCreate({
										shape,
									})),
									shape,
								});

								await onSuccess?.({ entity });

								await invalidator({
									queryClient,
									keys: $invalidate,
								});

								await router.invalidate();

								return entity;
							});
						});
					},
				});
			},
			usePatchMutation({
				wrap = (callback) => callback(),
				toPatch,
				onSuccess,
			}) {
				const queryClient = useQueryClient();
				const router = useRouter();

				return useMutation({
					mutationKey: ["usePatchMutation", name],
					async mutationFn(shape) {
						return wrap(async () => {
							$coolInstance.db.transaction().execute(async (tx) => {
								const entity = await $coolInstance.patch({
									tx,
									entity: shape,
									shape,
									...(await toPatch({
										shape,
									})),
								});

								await onSuccess?.({ entity });

								await invalidator({
									queryClient,
									keys: $invalidate,
								});

								await router.invalidate();

								return entity;
							});
						});
					},
				});
			},
			useRemoveMutation({ wrap = (callback) => callback(), onSuccess }) {
				const queryClient = useQueryClient();
				const router = useRouter();

				return useMutation({
					mutationKey: ["useRemoveMutation", name],
					async mutationFn({ idIn }) {
						return wrap(async () => {
							$coolInstance.db.transaction().execute(async (tx) => {
								await $coolInstance.remove({ tx, idIn });

								await invalidator({
									queryClient,
									keys: $invalidate,
								});

								await onSuccess?.({});

								await router.invalidate();

								return undefined;
							});
						});
					},
				});
			},
		};

		return $instance;
	};
};
