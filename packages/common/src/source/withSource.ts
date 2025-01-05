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
import type { withSourceSchema } from "./withSourceSchema";

export namespace withSource {
	export type Use = "where" | "filter" | "cursor" | "sort";

	export interface Query<
		TSchema extends withSourceSchema.Instance<
			EntitySchema,
			ShapeSchema,
			FilterSchema
		>,
	> {
		where?: TSchema["~filter"];
		filter?: TSchema["~filter"];
		cursor?: CursorSchema.Type;
	}

	export interface List<TData> {
		data: TData[];
		count: CountSchema.Type;
	}

	export namespace Map {
		export namespace toOutput {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				entity: TSchema["~entity"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace toCreate {
			export interface Props<
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> {
				entity: TSchema["~entity-partial-exclude-id"];
				shape: TSchema["~shape"];
			}

			export type Callback<
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<TSchema["~entity-partial-exclude-id"]>;
		}

		export namespace toPatch {
			export interface Props<
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> {
				entity: TSchema["~entity-partial-exclude-id"];
				shape: TSchema["~shape-partial"];
			}

			export type Callback<
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TSchema>) => TSchema["~entity-partial-exclude-id"];
		}
	}

	export interface Map<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> {
		toOutput?: Map.toOutput.Callback<TDatabase, TSchema>;
		toCreate?: Map.toCreate.Callback<TSchema>;
		toPatch?: Map.toPatch.Callback<TSchema>;
	}

	export namespace select$ {
		export interface Props<
			TDatabase,
			TSchema extends withSourceSchema.Instance<any, any, any>,
		> extends Query<TSchema> {
			tx: Transaction<TDatabase>;
			use: Use[];
		}

		export type Callback<
			TDatabase,
			TSchema extends withSourceSchema.Instance<any, any, any>,
		> = (props: Props<TDatabase, TSchema>) => SelectQueryBuilder<any, any, any>;
	}

	export namespace create$ {
		export interface Props<TDatabase> {
			tx: Transaction<TDatabase>;
		}

		export type Callback<TDatabase> = (
			props: Props<TDatabase>,
		) => InsertQueryBuilder<any, any, any>;
	}

	export namespace patch$ {
		export interface Props<TDatabase> {
			tx: Transaction<TDatabase>;
		}

		export type Callback<TDatabase> = (
			props: Props<TDatabase>,
		) => UpdateQueryBuilder<any, any, any, any>;
	}

	export namespace delete$ {
		export interface Props<TDatabase> {
			tx: Transaction<TDatabase>;
		}

		export type Callback<TDatabase> = (
			props: Props<TDatabase>,
		) => DeleteQueryBuilder<any, any, any>;
	}

	export namespace Event {
		export namespace onPreCreate {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				entity: TSchema["~entity-partial-exclude-id"];
				shape: TSchema["~shape"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<any>;
		}

		export namespace onPostCreate {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				entity: TSchema["~entity"];
				shape: TSchema["~shape"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<any>;
		}

		export namespace onPrePatch {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				entity: TSchema["~entity-partial-exclude-id"];
				shape: TSchema["~shape-partial"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<any>;
		}

		export namespace onPostPatch {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> {
				tx: Transaction<TDatabase>;
				entity: TSchema["~entity"];
				shape: TSchema["~shape-partial"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<any>;
		}
	}

	export interface Event<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> {
		onPreCreate?: Event.onPreCreate.Callback<TDatabase, TSchema>;
		onPostCreate?: Event.onPostCreate.Callback<TDatabase, TSchema>;
		onPrePatch?: Event.onPrePatch.Callback<TDatabase, TSchema>;
		onPostPatch?: Event.onPostPatch.Callback<TDatabase, TSchema>;
	}

	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> {
		name: string;
		schema: TSchema;
		db: Kysely<TDatabase>;

		map?: Map<TDatabase, TSchema>;

		select$: select$.Callback<TDatabase, TSchema>;
		create$: create$.Callback<TDatabase>;
		/**
		 * Just return the base query for patch; it's not necessary to understand the
		 * query itself (filter/where) as it's handled by the repository (select$).
		 */
		patch$: patch$.Callback<TDatabase>;
		/**
		 * Just return the base query for delete; it's not necessary to understand the
		 * query itself (filter/where) as it's handled by the repository (select$).
		 */
		delete$: delete$.Callback<TDatabase>;

		event?: Event<TDatabase, TSchema>;
	}

	export namespace Instance {
		export namespace create$ {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
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
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace patch$ {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> extends Omit<Query<TSchema>, "cursor"> {
				tx: Transaction<TDatabase>;
				entity: TSchema["~entity-partial-exclude-id"];
				/**
				 * Shape used to construct "entity" for patch.
				 */
				shape: TSchema["~shape-partial"];
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace delete$ {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> extends Omit<Query<TSchema>, "cursor"> {
				tx: Transaction<TDatabase>;
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace fetch$ {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> extends Omit<Query<TSchema>, "cursor"> {
				tx: Transaction<TDatabase>;
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (
				props: Props<TDatabase, TSchema>,
			) => Promise<TSchema["~output"] | undefined>;
		}

		export namespace fetchOrThrow$ {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> extends Omit<Query<TSchema>, "cursor"> {
				tx: Transaction<TDatabase>;
				error?: string;
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<TSchema["~output"]>;
		}

		export namespace get$ {
			export interface Props<TDatabase> {
				tx: Transaction<TDatabase>;
				id: string;
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase>) => Promise<TSchema["~output"] | undefined>;
		}

		export namespace getOrThrow$ {
			export interface Props<TDatabase> {
				tx: Transaction<TDatabase>;
				id: string;
				error?: string;
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase>) => Promise<TSchema["~output"]>;
		}

		export namespace list$ {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> extends Query<TSchema> {
				tx: Transaction<TDatabase>;
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (
				props: Props<TDatabase, TSchema>,
			) => Promise<TSchema["~output-array"]>;
		}

		export namespace count$ {
			export interface Props<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> extends Omit<Query<TSchema>, "sort" | "cursor"> {
				tx: Transaction<TDatabase>;
			}

			export type Callback<
				TDatabase,
				TSchema extends withSourceSchema.Instance<any, any, any>,
			> = (props: Props<TDatabase, TSchema>) => Promise<CountSchema.Type>;
		}
	}

	export interface Instance<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> {
		name: string;
		schema: TSchema;
		db: Kysely<TDatabase>;

		create$: Instance.create$.Callback<TDatabase, TSchema>;
		patch$: Instance.patch$.Callback<TDatabase, TSchema>;
		delete$: Instance.delete$.Callback<TDatabase, TSchema>;

		fetch$: Instance.fetch$.Callback<TDatabase, TSchema>;
		fetchOrThrow$: Instance.fetchOrThrow$.Callback<TDatabase, TSchema>;
		list$: Instance.list$.Callback<TDatabase, TSchema>;
		count$: Instance.count$.Callback<TDatabase, TSchema>;

		/**
		 * Sugar stuff
		 */
		get$: Instance.get$.Callback<TDatabase, TSchema>;
		getOrThrow$: Instance.getOrThrow$.Callback<TDatabase, TSchema>;
	}
}

export const withSource = <
	TDatabase,
	TSchema extends withSourceSchema.Instance<
		EntitySchema,
		ShapeSchema,
		FilterSchema
	>,
>({
	name,
	schema,
	db,
	map,
	select$,
	create$,
	patch$,
	delete$,
	event,
}: withSource.Props<TDatabase, TSchema>): withSource.Instance<
	TDatabase,
	TSchema
> => {
	return {
		name,
		schema,
		db,

		async create$({ tx, entity, shape }): Promise<TSchema["~output"]> {
			const $id = id();

			await event?.onPreCreate?.({ tx, entity, shape });

			await create$({ tx })
				.values(
					schema.entity.parse({
						...((await map?.toCreate?.({ entity, shape })) || entity),
						id: $id,
					}),
				)
				.execute();

			const $entity = await this.getOrThrow$({
				tx,
				id: $id,
			});

			await event?.onPostCreate?.({ tx, entity: $entity, shape });

			return $entity;
		},
		async patch$({
			tx,
			entity,
			shape,
			where,
			filter,
		}): Promise<TSchema["~output"]> {
			const $entity = await this.fetchOrThrow$({
				tx,
				where,
				filter,
				error: "Cannot patch an unknown entity (empty query result).",
			});

			await event?.onPrePatch?.({ tx, entity, shape });

			await patch$({ tx })
				.set(
					schema.entity
						.partial()
						.parse((await map?.toPatch?.({ entity, shape })) || entity),
				)
				.where("id", "=", $entity.id)
				.execute();

			const $updated = await this.getOrThrow$({
				tx,
				id: $entity.id,
			});

			await event?.onPostPatch?.({ tx, entity: $updated, shape });

			return $updated;
		},
		async delete$({ tx, where, filter }): Promise<TSchema["~output"]> {
			const $entity = await this.fetchOrThrow$({
				tx,
				where,
				filter,
				error: "Cannot patch an unknown entity (empty query result).",
			});

			await delete$({ tx }).where("id", "=", $entity.id).execute();

			return $entity;
		},
		async fetch$({ tx, where, filter }) {
			const entity = await select$({
				tx,
				where,
				filter,
				cursor: { page: 0, size: 1 },
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
		async fetchOrThrow$({ tx, where, filter, error }) {
			try {
				const $entity = schema.entity.parse(
					await select$({
						tx,
						where,
						filter,
						cursor: { page: 0, size: 1 },
						use: ["where", "filter", "cursor", "sort"],
					}).executeTakeFirstOrThrow(),
				);

				return (schema.output ?? schema.entity).parse(
					(await map?.toOutput?.({
						tx,
						entity: $entity,
					})) || $entity,
				);
			} catch (e) {
				if (error) {
					throw new Error(error);
				} else {
					throw e;
				}
			}
		},
		async get$({ tx, id }) {
			return this.fetch$({ tx, where: { id } });
		},
		async getOrThrow$({ tx, id, error }) {
			return this.fetchOrThrow$({ tx, where: { id }, error });
		},
		async list$({
			tx,
			where,
			filter,
			cursor,
		}): Promise<TSchema["~output-array"]> {
			const $schema = schema.output ?? schema.entity;

			return Promise.all(
				z
					.array(schema.entity)
					.parse(
						await select$({
							tx,
							where,
							filter,
							cursor,
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
		async count$({ tx, where, filter }) {
			return {
				total: (
					await select$({ tx, use: [] })
						.select([(col) => col.fn.countAll().as("count")])
						.executeTakeFirst()
				).count,
				where: (
					await select$({ tx, where, use: [] })
						.select([(col) => col.fn.countAll().as("count")])
						.executeTakeFirst()
				).count,
				filter: (
					await select$({ tx, where, filter, use: [] })
						.select([(col) => col.fn.countAll().as("count")])
						.executeTakeFirst()
				).count,
			} satisfies CountSchema.Type;
		},
	};
};
