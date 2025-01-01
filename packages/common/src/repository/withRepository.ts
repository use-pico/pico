import type {
    DeleteQueryBuilder,
    InsertQueryBuilder,
    SelectQueryBuilder,
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
	export type Apply = "where" | "filter" | "cursor" | "sort";

	export interface Query<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
		where?: withRepositorySchema.Filter<TSchema>;
		filter?: withRepositorySchema.Filter<TSchema>;
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
				where: Omit<
					Record<keyof withRepositorySchema.Filter<TSchema>, string>,
					"fulltext"
				>;
				/**
				 * Which fields are used for fulltext search.
				 */
				fulltext?: string[];
			}
		}

		export namespace toOutput {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				entity: withRepositorySchema.Entity<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<withRepositorySchema.Output<TSchema>>;
		}

		export namespace toCreate {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				entity: Partial<Omit<withRepositorySchema.Entity<TSchema>, "id">>;
				shape: withRepositorySchema.Shape<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<Partial<Omit<withRepositorySchema.Entity<TSchema>, "id">>>;
		}

		export namespace toPatch {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				entity: Partial<Omit<withRepositorySchema.Entity<TSchema>, "id">>;
				shape: Partial<withRepositorySchema.Shape<TSchema>>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<Partial<Omit<withRepositorySchema.Entity<TSchema>, "id">>>;
		}

		export namespace insert {
			export interface Props {
				//
			}

			export type Callback = (
				props: Props,
			) => InsertQueryBuilder<any, any, any>;
		}

		export namespace update {
			export interface Props {
				//
			}

			export type Callback = (
				props: Props,
			) => UpdateQueryBuilder<any, any, any, any>;
		}

		export namespace remove {
			export interface Props {
				//
			}

			export type Callback = (
				props: Props,
			) => DeleteQueryBuilder<any, any, any>;
		}

		export namespace select {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: Query<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TSchema>) => SelectQueryBuilder<any, any, any>;
		}

		export namespace applyWhere {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				where?: withRepositorySchema.Filter<TSchema>;
				select: SelectQueryBuilder<any, any, any>;
				apply?: Apply[];
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TSchema>) => SelectQueryBuilder<any, any, any>;
		}
	}

	export interface Props<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
		schema: TSchema;
		meta: Props.Meta.Instance<TSchema>;

		toOutput?: Props.toOutput.Callback<TSchema>;

		toCreate?: Props.toCreate.Callback<TSchema>;
		toPatch?: Props.toPatch.Callback<TSchema>;

		insert: Props.insert.Callback;
		update: Props.update.Callback;
		remove: Props.remove.Callback;
		select: Props.select.Callback<TSchema>;

		applyWhere?: Props.applyWhere.Callback<TSchema>;
		applyFilter?: Props.applyWhere.Callback<TSchema>;
	}

	export namespace Instance {
		export namespace create {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				/**
				 * Shape used to construct "entity" for creation.
				 */
				shape: withRepositorySchema.Shape<TSchema>;
				/**
				 * Pieces of the final entity being pushed into database.
				 */
				entity: Partial<Omit<withRepositorySchema.Entity<TSchema>, "id">>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<withRepositorySchema.Output<TSchema>>;
		}

		export namespace patch {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				entity: Partial<Omit<withRepositorySchema.Entity<TSchema>, "id">>;
				/**
				 * Shape used to construct "entity" for patch.
				 */
				shape: Partial<withRepositorySchema.Shape<TSchema>>;
				filter: withRepositorySchema.Filter<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<withRepositorySchema.Output<TSchema>>;
		}

		export namespace remove {
			export interface Props {
				idIn?: string[];
			}

			export type Callback = (props: Props) => Promise<any>;
		}

		export namespace fetch {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: Query<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<withRepositorySchema.Output<TSchema> | undefined>;
		}

		export namespace fetchOrThrow {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: Query<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<withRepositorySchema.Output<TSchema>>;
		}

		export namespace list {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: Query<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<withRepositorySchema.Output<TSchema>[]>;
		}

		export namespace count {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: Omit<Query<TSchema>, "sort" | "cursor">;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TSchema>) => Promise<CountSchema.Type>;
		}

		export namespace applyQuery {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: Query<TSchema>;
				select: SelectQueryBuilder<any, any, any>;
				apply?: Apply[];
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (props: Props<TSchema>) => SelectQueryBuilder<any, any, any>;
		}
	}

	export interface Instance<
		TSchema extends withRepositorySchema.Instance<any, any, any>,
	> {
		schema: TSchema;

		create: Instance.create.Callback<TSchema>;
		patch: Instance.patch.Callback<TSchema>;
		remove: Instance.remove.Callback;

		fetch: Instance.fetch.Callback<TSchema>;
		fetchOrThrow: Instance.fetchOrThrow.Callback<TSchema>;
		list: Instance.list.Callback<TSchema>;
		count: Instance.count.Callback<TSchema>;
	}
}

export const withRepository = <
	TSchema extends withRepositorySchema.Instance<
		EntitySchema,
		ShapeSchema,
		FilterSchema
	>,
>({
	schema,
	meta,
	toOutput = async ({ entity }) => entity,
	toCreate = async ({ entity }) => entity,
	toPatch = async ({ entity }) => entity,
	insert,
	update,
	remove,
	select,
	applyWhere = ({ select }) => select,
	applyFilter = ({ select }) => select,
}: withRepository.Props<TSchema>): withRepository.Instance<TSchema> => {
	const $applyCommonWhere: withRepository.Props.applyWhere.Callback<
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

	const $applyWhere: withRepository.Props.applyWhere.Callback<TSchema> = ({
		where,
		select,
		apply = ["where", "filter", "cursor", "sort"],
	}) => {
		if (!apply.includes("where")) {
			return select;
		}

		return applyWhere({
			where,
			select: $applyCommonWhere({
				select,
				where,
				apply,
			}),
			apply,
		});
	};

	const $applyFilter: withRepository.Props.applyWhere.Callback<TSchema> = ({
		where,
		select,
		apply = ["where", "filter", "cursor", "sort"],
	}) => {
		if (!apply.includes("filter")) {
			return select;
		}

		return applyFilter({
			where,
			select: $applyCommonWhere({
				select,
				where,
				apply,
			}),
			apply,
		});
	};

	const $applyQuery: withRepository.Instance.applyQuery.Callback<TSchema> = ({
		query: { where, filter, cursor = { page: 0, size: 10 } },
		select,
		apply = ["where", "filter", "cursor", "sort"],
	}) => {
		let $select = $applyFilter({
			where: filter,
			select: $applyWhere({
				select,
				where,
				apply,
			}),
			apply,
		});

		if (apply.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	};

	const instance: withRepository.Instance<TSchema> = {
		schema,
		async create({ entity, shape }) {
			const $id = id();

			await insert({})
				.values(
					schema.entity.parse({
						...(await toCreate({ entity, shape })),
						id: $id,
					}),
				)
				.execute();

			return instance.fetchOrThrow({
				query: {
					where: {
						id: $id,
					},
				},
			});
		},
		async patch({ entity, shape, filter }) {
			const $entity = await instance.fetchOrThrow({ query: { where: filter } });

			if (!$entity) {
				throw new Error("Cannot patch an unknown entity (empty query result).");
			}

			await update({})
				.set(schema.entity.partial().parse(await toPatch({ entity, shape })))
				.where("id", "=", $entity.id)
				.execute();

			return instance.fetchOrThrow({ query: { where: { id: $entity.id } } });
		},
		async remove({ idIn }) {
			if (!idIn || idIn?.length === 0) {
				console.log("nothing to remove");
				return undefined;
			}
			return remove({}).where("id", "in", idIn).execute();
		},
		async fetch({ query }) {
			const entity = await $applyQuery({
				query,
				select: select({ query }),
			}).executeTakeFirst();

			if (!entity) {
				return undefined;
			}

			return (schema.output ?? schema.entity).parse(
				await toOutput({ entity: schema.entity.parse(entity) }),
			);
		},
		async fetchOrThrow({ query }) {
			return (schema.output ?? schema.entity).parse(
				await toOutput({
					entity: schema.entity.parse(
						await $applyQuery({
							query,
							select: select({ query }),
						}).executeTakeFirstOrThrow(),
					),
				}),
			);
		},
		async list({ query }) {
			const $schema = schema.output ?? schema.entity;

			return Promise.all(
				z
					.array(schema.entity)
					.parse(
						await $applyQuery({
							query,
							select: select({ query }),
						}).execute(),
					)
					.map(async (entity) => {
						return $schema.parse(await toOutput({ entity }));
					}),
			);
		},
		async count({ query }) {
			return {
				total: (
					await $applyQuery({
						query: {},
						select: select({ query }).select([
							(col) => col.fn.countAll().as("count"),
						]),
						apply: [],
					}).executeTakeFirst()
				).count,
				where: (
					await $applyQuery({
						query: {
							where: query.where,
						},
						select: select({ query }).select([
							(col) => col.fn.countAll().as("count"),
						]),
						apply: ["where"],
					}).executeTakeFirst()
				).count,
				filter: (
					await $applyQuery({
						query: {
							where: query.where,
							filter: query.filter,
						},
						select: select({ query }).select([
							(col) => col.fn.countAll().as("count"),
						]),
						apply: ["filter", "where"],
					}).executeTakeFirst()
				).count,
			} satisfies CountSchema.Type;
		},
	};

	return instance;
};
