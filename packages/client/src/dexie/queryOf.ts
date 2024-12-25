import {
    useMutation,
    useQueryClient,
    type QueryClient,
    type UseMutationResult,
} from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
    fulltextOf,
    id,
    type CountSchema,
    type CursorSchema,
    type FilterSchema,
    type IdentitySchema,
    type ShapeSchema,
} from "@use-pico/common";
import type { EntityTable } from "dexie";
import type { z } from "zod";
import { invalidator } from "../invalidator/invalidator";
import type { Loader } from "../loader/Loader";

export namespace queryOf {
	export interface Query<TFilterSchema extends FilterSchema> {
		where?: z.infer<TFilterSchema>;
		filter?: z.infer<TFilterSchema>;
		cursor?: CursorSchema.Type;
	}

	export namespace Filter {
		export interface Props<
			TEntitySchema extends IdentitySchema,
			TFilterSchema extends FilterSchema,
		> {
			entity: z.infer<TEntitySchema>;
			filter?: z.infer<TFilterSchema>;
		}

		export type Callback<
			TEntitySchema extends IdentitySchema,
			TFilterSchema extends FilterSchema,
		> = (props: Filter.Props<TEntitySchema, TFilterSchema>) => boolean;
	}

	export interface Props<
		TEntitySchema extends IdentitySchema,
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
	> {
		name: string;
		source: EntityTable<z.infer<TEntitySchema>, "id">;
		schema: {
			entity: TEntitySchema;
			shape: TShapeSchema;
			filter: TFilterSchema;
		};
		onFilter: Filter.Callback<TEntitySchema, TFilterSchema>;
	}

	export namespace Instance {
		export interface Request<TShapeSchema extends ShapeSchema> {
			shape: z.infer<TShapeSchema>;
		}

		export interface Create<TShapeSchema extends ShapeSchema>
			extends Request<TShapeSchema> {
			//
		}

		export interface Patch<
			TShapeSchema extends ShapeSchema,
			TFilterSchema extends FilterSchema,
		> extends Request<TShapeSchema> {
			filter: z.infer<TFilterSchema>;
		}

		export namespace useCreateMutation {
			export interface Props<
				TEntitySchema extends IdentitySchema,
				TShapeSchema extends ShapeSchema,
			> {
				toCreate(
					shape: z.infer<TShapeSchema>,
				): Promise<Omit<z.infer<TEntitySchema>, "id">>;
			}
		}

		export namespace usePatchMutation {
			export interface Props<
				TShapeSchema extends ShapeSchema,
				TFilterSchema extends FilterSchema,
			> {
				toPatch(
					shape: z.infer<TShapeSchema>,
				): Promise<Patch<TShapeSchema, TFilterSchema>>;
			}
		}

		export namespace withFetchLoader {
			export interface Props<TFilterSchema extends FilterSchema>
				extends Loader.PropsSchema<TFilterSchema> {
				//
			}
		}

		export namespace withListLoader {
			export interface Props<TFilterSchema extends FilterSchema>
				extends Loader.PropsSchema<TFilterSchema> {
				//
			}
		}

		export namespace withCountLoader {
			export interface Props<TFilterSchema extends FilterSchema>
				extends Omit<Loader.PropsSchema<TFilterSchema>, "cursor"> {
				queryClient: QueryClient;
			}
		}
	}

	export interface Instance<
		TEntitySchema extends IdentitySchema,
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
	> {
		query(query: Query<TFilterSchema>): Promise<z.infer<TEntitySchema>[]>;
		fetch(query: Query<TFilterSchema>): Promise<z.infer<TEntitySchema>>;
		count(
			query: Omit<Query<TFilterSchema>, "cursor">,
		): Promise<CountSchema.Type>;
		create(
			create: Omit<z.infer<TEntitySchema>, "id">,
		): Promise<z.infer<TEntitySchema>>;
		patch(
			patch: Instance.Patch<TShapeSchema, TFilterSchema>,
		): Promise<z.infer<TEntitySchema>>;

		useCreateMutation(
			props: Instance.useCreateMutation.Props<TEntitySchema, TShapeSchema>,
		): UseMutationResult<
			z.infer<TEntitySchema>,
			Error,
			Omit<z.infer<TEntitySchema>, "id">
		>;
		usePatchMutation(
			props: Instance.usePatchMutation.Props<TShapeSchema, TFilterSchema>,
		): UseMutationResult<z.infer<TEntitySchema>, Error, z.infer<TShapeSchema>>;

		withFetchLoader(
			props: Instance.withFetchLoader.Props<TFilterSchema>,
		): Promise<z.infer<TEntitySchema>>;
		withListLoader(
			props: Instance.withListLoader.Props<TFilterSchema>,
		): Promise<z.infer<TEntitySchema>[]>;
		withCountLoader(
			props: Instance.withCountLoader.Props<TFilterSchema>,
		): Promise<CountSchema.Type>;
	}
}

export const queryOf = <
	TEntitySchema extends IdentitySchema,
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	name,
	source,
	schema: { entity },
	onFilter,
}: queryOf.Props<TEntitySchema, TShapeSchema, TFilterSchema>): queryOf.Instance<
	TEntitySchema,
	TShapeSchema,
	TFilterSchema
> => {
	const $filter: queryOf.Filter.Callback<TEntitySchema, TFilterSchema> = ({
		filter: { fulltext, id, idIn, ...filter } = {},
		entity,
	}) => {
		if (Array.isArray(idIn) && !idIn.length) {
			return false;
		}

		return (
			(id ? entity.id === id : true) &&
			(Array.isArray(idIn) ? idIn.includes(entity.id) : true) &&
			fulltextOf({
				source: entity,
				fulltext,
			}) &&
			onFilter({ filter, entity })
		);
	};

	const $query: queryOf.Instance<
		TEntitySchema,
		TShapeSchema,
		TFilterSchema
	>["query"] = async (query) => {
		return source
			.filter((entity) => {
				return (
					$filter({
						entity,
						filter: query.where as z.infer<TFilterSchema>,
					}) &&
					$filter({ entity, filter: query.filter as z.infer<TFilterSchema> })
				);
			})
			.offset((query.cursor?.page || 0) * (query.cursor?.size || 10))
			.limit(query.cursor?.size || 10)
			.toArray();
	};

	const $fetch: queryOf.Instance<
		TEntitySchema,
		TShapeSchema,
		TFilterSchema
	>["fetch"] = async (query) => {
		return entity.parse(
			await source
				.filter((entity) => {
					return (
						$filter({
							entity,
							filter: query.where as z.infer<TFilterSchema>,
						}) &&
						$filter({
							entity,
							filter: query.filter as z.infer<TFilterSchema>,
						})
					);
				})
				.offset((query.cursor?.page || 0) * (query.cursor?.size || 10))
				.limit(query.cursor?.size || 10)
				.first(),
		);
	};

	const $create: queryOf.Instance<
		TEntitySchema,
		TShapeSchema,
		TFilterSchema
	>["create"] = async (create) => {
		const $id = id();

		await source.add(
			entity.parse({
				...create,
				id: $id,
			}) as z.infer<TEntitySchema>,
		);

		return entity.parse(await source.where({ id: $id }).first());
	};

	const $patch: queryOf.Instance<
		TEntitySchema,
		TShapeSchema,
		TFilterSchema
	>["patch"] = async ({ shape, filter }) => {
		const $entity = await $fetch({ filter });

		await source
			.filter((entity) => {
				return $filter({
					entity,
					filter,
				});
			})
			.modify(shape);

		return entity.parse(
			await $fetch({
				where: { id: $entity.id },
			}),
		);
	};

	const $count: queryOf.Instance<
		TEntitySchema,
		TShapeSchema,
		TFilterSchema
	>["count"] = async ({ where, filter }) => {
		return {
			total: await source.count(),
			filter: await source
				.filter((entity) => {
					return (
						$filter({
							entity,
							filter: where as z.infer<TFilterSchema>,
						}) &&
						$filter({
							entity,
							filter: filter as z.infer<TFilterSchema>,
						})
					);
				})
				.count(),
			where: await source
				.filter((entity) => {
					return $filter({
						entity,
						filter: where as z.infer<TFilterSchema>,
					});
				})
				.count(),
		};
	};

	return {
		query: $query,
		fetch: $fetch,
		count: $count,
		create: $create,
		patch: $patch,
		useCreateMutation({ toCreate }) {
			const queryClient = useQueryClient();
			const router = useRouter();

			return useMutation({
				mutationKey: ["useCreateMutation", name, "create"],
				async mutationFn(shape) {
					const entity = await $create(await toCreate(shape));

					await invalidator({
						queryClient,
						keys: [
							["withFetchLoader", name],
							["withListLoader", name],
							["withCountLoader", name],
						],
					});

					await router.invalidate();

					return entity;
				},
			});
		},
		usePatchMutation({ toPatch }) {
			const queryClient = useQueryClient();
			const router = useRouter();

			return useMutation({
				mutationKey: ["usePatchMutation", name, "patch"],
				async mutationFn(patch) {
					const entity = await $patch(await toPatch(patch));

					await invalidator({
						queryClient,
						keys: [
							["withFetchLoader", name],
							["withListLoader", name],
							["withCountLoader", name],
						],
					});

					await router.invalidate();

					return entity;
				},
			});
		},
		async withFetchLoader({
			queryClient,
			where,
			filter,
			cursor = { page: 0, size: 10 },
		}) {
			return queryClient.ensureQueryData({
				queryKey: ["withFetchLoader", name, { where, filter, cursor }],
				async queryFn(): Promise<z.infer<TEntitySchema>> {
					return $fetch({
						where,
						filter,
						cursor,
					});
				},
			});
		},
		async withListLoader({
			queryClient,
			where,
			filter,
			cursor = { page: 0, size: 10 },
		}) {
			return queryClient.ensureQueryData({
				queryKey: ["withListLoader", name, { where, filter, cursor }],
				async queryFn(): Promise<z.infer<TEntitySchema>[]> {
					return $query({
						where,
						filter,
						cursor,
					});
				},
			});
		},
		async withCountLoader({ queryClient, where, filter }) {
			return queryClient.ensureQueryData({
				queryKey: ["withCountLoader", name, { where, filter }],
				async queryFn(): Promise<CountSchema.Type> {
					return $count({
						filter,
						where,
					});
				},
			});
		},
	};
};
