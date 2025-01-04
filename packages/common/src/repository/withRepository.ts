import type {
    DeleteQueryBuilder,
    InsertQueryBuilder,
    Kysely,
    SelectQueryBuilder,
    Transaction,
    UpdateQueryBuilder,
} from "kysely";
import { z } from "zod";
import type { CountSchema } from "../schema/CountSchema";
import type { CursorSchema } from "../schema/CursorSchema";
import type { EntitySchema } from "../schema/EntitySchema";
import type { FilterSchema } from "../schema/FilterSchema";
import type { ShapeSchema } from "../schema/ShapeSchema";
import { id } from "../toolbox/id";
import type { withRepositorySchema } from "./withRepositorySchema";

export namespace withRepository {
	export type Use = "where" | "filter" | "cursor" | "sort";

	export interface IdentityFilter {
		id?: string;
		idIn?: string[];
	}

	export interface Query<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
		where?: TSchema["~filter"];
		filter?: TSchema["~filter"];
		cursor?: CursorSchema.Type;
	}

	export interface List<TData> {
		data: TData[];
		count: CountSchema.Type;
	}

	export namespace Props {
		export namespace Map {
			export namespace toOutput {
				export interface Props<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					tx: Transaction<TDatabase>;
					entity: TSchema["~entity"];
				}

				export type Callback<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
			}

			export namespace toCreate {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					entity: TSchema["~entity-partial-exclude-id"];
					shape: TSchema["~shape"];
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (
					props: Props<TSchema>,
				) => Promise<TSchema["~entity-partial-exclude-id"]>;
			}

			export namespace toPatch {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					entity: TSchema["~entity-partial-exclude-id"];
					shape: TSchema["~shape-partial"];
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TSchema>) => TSchema["~entity-partial-exclude-id"];
			}

			export interface Instance<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				toOutput?: toOutput.Callback<TDatabase, TSchema>;
				toCreate?: toCreate.Callback<TSchema>;
				toPatch?: toPatch.Callback<TSchema>;
			}
		}

		export namespace select {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				query: Query<TSchema>;
				use: Use[];
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TDatabase, TSchema>,
			) => SelectQueryBuilder<any, any, any>;
		}

		export namespace insert {
			export interface Props<TDatabase> {
				tx: Transaction<TDatabase>;
			}

			export type Callback<TDatabase> = (
				props: Props<TDatabase>,
			) => InsertQueryBuilder<any, any, any>;
		}

		export namespace update {
			export interface Props<TDatabase> {
				tx: Transaction<TDatabase>;
				filter: IdentityFilter;
			}

			export type Callback<TDatabase> = (
				props: Props<TDatabase>,
			) => UpdateQueryBuilder<any, any, any, any>;
		}

		export namespace remove {
			export interface Props<TDatabase> {
				tx: Transaction<TDatabase>;
				filter: IdentityFilter;
			}

			export type Callback<TDatabase> = (
				props: Props<TDatabase>,
			) => DeleteQueryBuilder<any, any, any>;
		}

		export namespace Event {
			export namespace onPreCreate {
				export interface Props<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					tx: Transaction<TDatabase>;
					entity: TSchema["~entity-partial-exclude-id"];
					shape: TSchema["~shape"];
				}

				export type Callback<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TDatabase, TSchema>) => Promise<any>;
			}

			export namespace onPostCreate {
				export interface Props<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					tx: Transaction<TDatabase>;
					entity: TSchema["~entity"];
					shape: TSchema["~shape"];
				}

				export type Callback<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TDatabase, TSchema>) => Promise<any>;
			}

			export namespace onPrePatch {
				export interface Props<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					tx: Transaction<TDatabase>;
					entity: TSchema["~entity-partial-exclude-id"];
					shape: TSchema["~shape-partial"];
				}

				export type Callback<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TDatabase, TSchema>) => Promise<any>;
			}

			export namespace onPostPatch {
				export interface Props<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					tx: Transaction<TDatabase>;
					entity: TSchema["~entity"];
					shape: TSchema["~shape-partial"];
				}

				export type Callback<
					TDatabase,
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TDatabase, TSchema>) => Promise<any>;
			}

			export interface Instance<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				onPreCreate?: onPreCreate.Callback<TDatabase, TSchema>;
				onPostCreate?: onPostCreate.Callback<TDatabase, TSchema>;
				onPrePatch?: onPrePatch.Callback<TDatabase, TSchema>;
				onPostPatch?: onPostPatch.Callback<TDatabase, TSchema>;
			}
		}
	}

	export interface Props<
		TDatabase,
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
		schema: TSchema;

		map?: Props.Map.Instance<TDatabase, TSchema>;

		select: Props.select.Callback<TDatabase, TSchema>;
		insert: Props.insert.Callback<TDatabase>;
		update: Props.update.Callback<TDatabase>;
		remove: Props.remove.Callback<TDatabase>;

		event?: Props.Event.Instance<TDatabase, TSchema>;
	}

	export namespace Instance {
		export namespace create {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				/**
				 * Shape used to construct "entity" for creation.
				 */
				shape: TSchema["~shape"];
				/**
				 * Pieces of the final entity being pushed into database.
				 */
				entity: TSchema["~entity-partial-exclude-id"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace patch {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				entity: TSchema["~entity-partial-exclude-id"];
				/**
				 * Shape used to construct "entity" for patch.
				 */
				shape: TSchema["~shape-partial"];
				filter: IdentityFilter;
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace remove {
			export interface Props<TDatabase> {
				tx: Transaction<TDatabase>;
				filter: IdentityFilter;
			}

			export type Callback<TDatabase> = (
				props: Props<TDatabase>,
			) => Promise<any>;
		}

		export namespace fetch {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				query: Query<TSchema>;
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TDatabase, TSchema>,
			) => Promise<TSchema["~output"] | undefined>;
		}

		export namespace fetchOrThrow {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				query: Query<TSchema>;
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace list {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				query: Query<TSchema>;
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TDatabase, TSchema>,
			) => Promise<TSchema["~output-array"]>;
		}

		export namespace count {
			export interface Props<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				query: Omit<Query<TSchema>, "sort" | "cursor">;
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<CountSchema.Type>;
		}

		export namespace applyQuery {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: Query<TSchema>;
				select: SelectQueryBuilder<any, any, any>;
				use?: Use[];
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TSchema>) => SelectQueryBuilder<any, any, any>;
		}
	}

	export interface Instance<
		TDatabase,
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
		schema: TSchema;
		db: Kysely<TDatabase>;

		create: Instance.create.Callback<TDatabase, TSchema>;
		patch: Instance.patch.Callback<TDatabase, TSchema>;
		remove: Instance.remove.Callback<TDatabase>;

		fetch: Instance.fetch.Callback<TDatabase, TSchema>;
		fetchOrThrow: Instance.fetchOrThrow.Callback<TDatabase, TSchema>;
		list: Instance.list.Callback<TDatabase, TSchema>;
		count: Instance.count.Callback<TDatabase, TSchema>;
	}

	export type Callback<
		TDatabase,
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> = (db: Kysely<TDatabase>) => Instance<TDatabase, TSchema>;
}

export const withRepository = <
	TDatabase,
	TSchema extends withRepositorySchema.Instance<
		EntitySchema,
		ShapeSchema,
		FilterSchema
	>,
>({
	schema,
	map,
	select,
	insert,
	remove,
	update,
	event,
}: withRepository.Props<TDatabase, TSchema>): withRepository.Callback<
	TDatabase,
	TSchema
> => {
	return (db) => {
		const instance: withRepository.Instance<TDatabase, TSchema> = {
			db,
			schema,
			async create({ tx, entity, shape }) {
				const $id = id();

				await event?.onPreCreate?.({ tx, entity, shape });

				await insert({ tx })
					.values(
						schema.entity.parse({
							...((await map?.toCreate?.({ entity, shape })) || entity),
							id: $id,
						}),
					)
					.execute();

				const $entity = await instance.fetchOrThrow({
					tx,
					query: {
						where: {
							id: $id,
						},
					},
				});

				await event?.onPostCreate?.({ tx, entity: $entity, shape });

				return $entity;
			},
			async patch({ tx, entity, shape, filter }) {
				const $entity = await instance.fetchOrThrow({
					tx,
					query: { where: filter },
				});

				if (!$entity) {
					throw new Error(
						"Cannot patch an unknown entity (empty query result).",
					);
				}

				await event?.onPrePatch?.({ tx, entity, shape });

				await update({ tx, filter })
					.set(
						schema.entity
							.partial()
							.parse((await map?.toPatch?.({ entity, shape })) || entity),
					)
					.execute();

				const $updated = await instance.fetchOrThrow({
					tx,
					query: { where: { id: $entity.id } },
				});

				await event?.onPostPatch?.({ tx, entity: $updated, shape });

				return $updated;
			},
			async remove({ tx, filter }) {
				return remove({ tx, filter }).execute();
			},
			async fetch({ tx, query }) {
				const entity = await select({
					tx,
					query,
					use: ["where", "filter", "cursor", "sort"],
				}).executeTakeFirst();

				if (!entity) {
					return undefined;
				}

				const $entity = schema.entity.parse(entity);

				return (schema.output ?? schema.entity).parse(
					(await map?.toOutput?.({ tx, entity: $entity })) || $entity,
				);
			},
			async fetchOrThrow({ tx, query }) {
				const $entity = schema.entity.parse(
					await select({
						tx,
						query,
						use: ["where", "filter", "cursor", "sort"],
					}).executeTakeFirstOrThrow(),
				);

				return (schema.output ?? schema.entity).parse(
					(await map?.toOutput?.({
						tx,
						entity: $entity,
					})) || $entity,
				);
			},
			async list({ tx, query }) {
				const $schema = schema.output ?? schema.entity;

				return Promise.all(
					z
						.array(schema.entity)
						.parse(
							await select({
								tx,
								query,
								use: ["where", "filter", "cursor", "sort"],
							}).execute(),
						)
						.map((entity) => schema.entity.parse(entity))
						.map(async (entity) => {
							return $schema.parse(
								(await map?.toOutput?.({ tx, entity })) || entity,
							);
						}),
				);
			},
			async count({ tx, query }) {
				return {
					total: (
						await select({ tx, query, use: [] })
							.select([(col) => col.fn.countAll().as("count")])
							.executeTakeFirst()
					).count,
					where: (
						await select({ tx, query, use: ["where"] })
							.select([(col) => col.fn.countAll().as("count")])
							.executeTakeFirst()
					).count,
					filter: (
						await select({ tx, query, use: ["filter", "where"] })
							.select([(col) => col.fn.countAll().as("count")])
							.executeTakeFirst()
					).count,
				} satisfies CountSchema.Type;
			},
		};

		return instance;
	};
};
