import {
    useMutation,
    useQueryClient,
    type QueryClient,
    type QueryKey,
    type UseMutationResult,
} from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
    withRepository as withCoolRepository,
    type CountSchema,
    type CursorSchema,
    type withRepositorySchema,
} from "@use-pico/common";
import { invalidator } from "../invalidator/invalidator";

export namespace withRepository {
	export interface Props<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> extends withCoolRepository.Props<TSchema> {
		name: string;
		invalidate?: QueryKey[];
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

		export namespace useCreateMutation {
			export namespace toCreate {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					shape: withRepositorySchema.Shape<TSchema>;
				}

				export interface Response<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					shape: withRepositorySchema.Shape<TSchema>;
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
				wrap?<T>(callback: () => Promise<T>): Promise<T>;
				toCreate: toCreate.Callback<TSchema>;
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
			) => UseMutationResult<
				withRepositorySchema.Output<TSchema>,
				Error,
				withRepositorySchema.Shape<TSchema>
			>;
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
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> extends withCoolRepository.Instance<TSchema> {
		name: string;

		withFetchLoader: Instance.withFetchLoader.Callback<TSchema>;
		withListLoader: Instance.withListLoader.Callback<TSchema>;
		withCountLoader: Instance.withCountLoader.Callback<TSchema>;

		useCreateMutation: Instance.useCreateMutation.Callback<TSchema>;
		usePatchMutation: Instance.usePatchMutation.Callback<TSchema>;
		useRemoveMutation: Instance.useRemoveMutation.Callback;
	}
}

/**
 * Extended client-side repository support.
 */
export const withRepository = <
	TSchema extends withRepositorySchema.Instance<any, any, any>,
>({
	name,
	invalidate = [],
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
				async queryFn(): Promise<CountSchema.Type> {
					return $coolInstance.count({ query: { where, filter } });
				},
			});
		},

		useCreateMutation({
			wrap = async (callback) => callback(),
			toCreate,
			onSuccess,
		}) {
			const queryClient = useQueryClient();
			const router = useRouter();

			return useMutation({
				mutationKey: ["useCreateMutation", name],
				async mutationFn(shape) {
					return wrap(async () => {
						const entity = await $coolInstance.create(
							await toCreate({
								shape,
							}),
						);

						await onSuccess?.({ entity });

						await invalidator({
							queryClient,
							keys: [
								["withListLoader", name],
								["withFetchLoader", name],
								["withCountLoader", name],
								...invalidate,
							],
						});

						await router.invalidate();

						return entity;
					});
				},
			});
		},
		usePatchMutation({ wrap = (callback) => callback(), toPatch, onSuccess }) {
			const queryClient = useQueryClient();
			const router = useRouter();

			return useMutation({
				mutationKey: ["usePatchMutation", name],
				async mutationFn(shape) {
					return wrap(async () => {
						const patch = await toPatch({
							shape,
						});

						const entity = await $coolInstance.patch(patch);

						await onSuccess?.({ entity });

						await invalidator({
							queryClient,
							keys: [
								["withListLoader", name],
								["withFetchLoader", name],
								["withCountLoader", name],
								...invalidate,
							],
						});

						await router.invalidate();

						return entity;
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
						await $coolInstance.remove({ idIn });

						await invalidator({
							queryClient,
							keys: [
								["withListLoader", name],
								["withFetchLoader", name],
								["withCountLoader", name],
								...invalidate,
							],
						});

						await onSuccess?.({});

						await router.invalidate();

						return undefined;
					});
				},
			});
		},
	};

	return $instance;
};
