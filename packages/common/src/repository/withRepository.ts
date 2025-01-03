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
		export namespace Meta {
			export interface Instance<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				/**
				 * Map "client side" fields to "server side" fields.
				 */
				where: Omit<Record<keyof TSchema["~filter"], string>, "fulltext">;
				/**
				 * Which fields are used for fulltext search.
				 */
				fulltext?: string[];
			}
		}

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

		export namespace Mutation {
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
				}

				export type Callback<TDatabase> = (
					props: Props<TDatabase>,
				) => UpdateQueryBuilder<any, any, any, any>;
			}

			export namespace remove {
				export interface Props<TDatabase> {
					tx: Transaction<TDatabase>;
				}

				export type Callback<TDatabase> = (
					props: Props<TDatabase>,
				) => DeleteQueryBuilder<any, any, any>;
			}

			export interface Instance<TDatabase> {
				insert: insert.Callback<TDatabase>;
				update: update.Callback<TDatabase>;
				remove: remove.Callback<TDatabase>;
			}
		}

		export namespace select {
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
			) => SelectQueryBuilder<any, any, any>;
		}

		export namespace Apply {
			export namespace applyWhere {
				export interface Props<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> {
					where?: TSchema["~filter"];
					select: SelectQueryBuilder<any, any, any>;
					use?: Use[];
				}

				export type Callback<
					TSchema extends withRepositorySchema.Instance<any, any, any>,
				> = (props: Props<TSchema>) => SelectQueryBuilder<any, any, any>;
			}

			export interface Instance<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				applyWhere?: applyWhere.Callback<TSchema>;
				applyFilter?: applyWhere.Callback<TSchema>;
			}
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
		meta: Props.Meta.Instance<TSchema>;

		map?: Props.Map.Instance<TDatabase, TSchema>;

		mutation: Props.Mutation.Instance<TDatabase>;
		select: Props.select.Callback<TDatabase, TSchema>;

		apply?: Props.Apply.Instance<TSchema>;

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
				filter: TSchema["~filter"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace remove {
			export interface Props<TDatabase> {
				tx: Transaction<TDatabase>;
				idIn?: string[];
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
	meta,
	map,
	mutation,
	select,
	apply,
	event,
}: withRepository.Props<TDatabase, TSchema>): withRepository.Callback<
	TDatabase,
	TSchema
> => {
	const $applyCommonWhere: withRepository.Props.Apply.applyWhere.Callback<
		TSchema
	> = ({ where, select }) => {
		let $select = select;

		for (const [value, field] of Object.entries(meta.where) as [
			keyof typeof where,
			any,
		][]) {
			if (where?.[value] === undefined) {
				continue;
			}

			if (["idIn", "fulltext"].includes(value)) {
				continue;
			}

			/**
			 * Weak type, I know. It's better for now than making some huge type gymnastics as
			 * it's on the repository side to provide right meta.
			 */
			$select =
				where?.[value] === null ?
					$select.where(field as any, "is", null)
				:	$select.where(field as any, "=", where[value]);
		}

		if (where?.idIn) {
			$select = $select.where("id", "in", where.idIn);
		}
		if (meta?.fulltext && where?.fulltext) {
			const fulltext = where.fulltext.toLowerCase();
			$select = $select.where((ex) =>
				ex.or(
					meta.fulltext?.map((field) => {
						return ex(field, "like", `%${fulltext}%`);
					}) || [],
				),
			);
		}

		return $select;
	};

	const $applyWhere: withRepository.Props.Apply.applyWhere.Callback<
		TSchema
	> = ({ where, select, use = ["where", "filter", "cursor", "sort"] }) => {
		if (!use.includes("where")) {
			return select;
		}

		const applyWhere = apply?.applyWhere || (({ select }) => select);

		return applyWhere({
			where,
			select: $applyCommonWhere({
				select,
				where,
				use,
			}),
			use,
		});
	};

	const $applyFilter: withRepository.Props.Apply.applyWhere.Callback<
		TSchema
	> = ({ where, select, use = ["where", "filter", "cursor", "sort"] }) => {
		if (!use.includes("filter")) {
			return select;
		}

		const applyFilter = apply?.applyFilter || (({ select }) => select);

		return applyFilter({
			where,
			select: $applyCommonWhere({
				select,
				where,
				use,
			}),
			use,
		});
	};

	const $applyQuery: withRepository.Instance.applyQuery.Callback<TSchema> = ({
		query: { where, filter, cursor = { page: 0, size: 10 } },
		select,
		use = ["where", "filter", "cursor", "sort"],
	}) => {
		let $select = $applyFilter({
			where: filter,
			select: $applyWhere({
				select,
				where,
				use,
			}),
			use,
		});

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	};

	return (db) => {
		const instance: withRepository.Instance<TDatabase, TSchema> = {
			db,
			schema,
			async create({ tx, entity, shape }) {
				const $id = id();

				await event?.onPreCreate?.({ tx, entity, shape });

				await mutation
					.insert({ tx })
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

				await mutation
					.update({ tx })
					.set(
						schema.entity
							.partial()
							.parse((await map?.toPatch?.({ entity, shape })) || entity),
					)
					.where("id", "=", $entity.id)
					.execute();

				const $updated = await instance.fetchOrThrow({
					tx,
					query: { where: { id: $entity.id } },
				});

				await event?.onPostPatch?.({ tx, entity: $updated, shape });

				return $updated;
			},
			async remove({ tx, idIn }) {
				if (!idIn || idIn?.length === 0) {
					return undefined;
				}
				return mutation.remove({ tx }).where("id", "in", idIn).execute();
			},
			async fetch({ tx, query }) {
				const entity = await $applyQuery({
					query,
					select: select({ tx, query }),
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
					await $applyQuery({
						query,
						select: select({ tx, query }),
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
							await $applyQuery({
								query,
								select: select({ tx, query }),
							}).execute(),
						)
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
						await $applyQuery({
							query: {},
							select: select({ tx, query }).select([
								(col) => col.fn.countAll().as("count"),
							]),
							use: [],
						}).executeTakeFirst()
					).count,
					where: (
						await $applyQuery({
							query: {
								where: query.where,
							},
							select: select({ tx, query }).select([
								(col) => col.fn.countAll().as("count"),
							]),
							use: ["where"],
						}).executeTakeFirst()
					).count,
					filter: (
						await $applyQuery({
							query: {
								where: query.where,
								filter: query.filter,
							},
							select: select({ tx, query }).select([
								(col) => col.fn.countAll().as("count"),
							]),
							use: ["filter", "where"],
						}).executeTakeFirst()
					).count,
				} satisfies CountSchema.Type;
			},
		};

		return instance;
	};
};
