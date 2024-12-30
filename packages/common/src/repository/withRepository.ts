import type { InsertQueryBuilder, SelectQueryBuilder } from "kysely";
import type { Database } from "../database/Database";
import type { CursorSchema } from "../schema/CursorSchema";
import type { FilterSchema } from "../schema/FilterSchema";
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

	export namespace Props {
		export namespace Meta {
			export interface Instance<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				where: Omit<
					Record<keyof withRepositorySchema.Filter<TSchema>, string>,
					keyof FilterSchema.Type
				>;
			}
		}

		export namespace toCreate {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				shape: withRepositorySchema.Shape<TSchema>;
			}

			export type Callback<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> = (
				props: Props<TSchema>,
			) => Promise<Omit<withRepositorySchema.Entity<TSchema>, "id">>;
		}

		export namespace insert {
			export interface Props {
				//
			}

			export type Callback = (
				props: Props,
			) => InsertQueryBuilder<any, any, any>;
		}

		export namespace select {
			export interface Props {
				//
			}

			export type Callback = (
				props: Props,
			) => SelectQueryBuilder<any, any, any>;
		}

		export namespace applyWhere {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				where: withRepositorySchema.Filter<TSchema>;
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
		database: Database.Instance<any>;
		meta: Props.Meta.Instance<TSchema>;

		toCreate: Props.toCreate.Callback<TSchema>;

		insert: Props.insert.Callback;
		select: Props.select.Callback;

		applyWhere?: Props.applyWhere.Callback<TSchema>;
		applyFilter?: Props.applyWhere.Callback<TSchema>;
	}

	export namespace Instance {
		export namespace create {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				shape: withRepositorySchema.Shape<TSchema>;
			}
		}

		export namespace fetch {
			export interface Props<
				TSchema extends withRepositorySchema.Instance<any, any, any>,
			> {
				query: Query<TSchema>;
			}
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
		create(
			props: Instance.create.Props<TSchema>,
		): Promise<withRepositorySchema.Entity<TSchema>>;
		fetch(
			props: Instance.fetch.Props<TSchema>,
		): Promise<withRepositorySchema.Entity<TSchema> | undefined>;
	}
}

export const withRepository = <
	TSchema extends withRepositorySchema.Instance<any, any, any>,
>({
	schema,
	database,
	meta,
	toCreate,
	insert,
	select,
	applyWhere = ({ select }) => select,
	applyFilter = ({ select }) => select,
}: withRepository.Props<TSchema>): withRepository.Instance<TSchema> => {
	const $applyCommonWhere: withRepository.Props.applyWhere.Callback<
		TSchema
	> = ({ where, select }) => {
		let $select = select;

		for (const [value, field] of Object.entries(meta.where)) {
			if (where?.[value] === undefined) {
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
		query,
		select,
		apply = ["where", "filter", "cursor", "sort"],
	}) => {
		return $applyFilter({
			where: query.filter,
			select: $applyWhere({
				select,
				where: query.where,
				apply,
			}),
			apply,
		});
	};

	const instance: withRepository.Instance<TSchema> = {
		schema,
		async create({ shape }) {
			const $id = id();

			await database.run(
				insert({}).values({
					...(await toCreate({ shape })),
					id: $id,
				}),
			);

			return schema.entity.parse(
				await instance.fetch({
					query: {
						where: {
							id: $id,
						},
					},
				}),
			);
		},
		async fetch({ query }) {
			return schema.entity.parse(
				await database.fetch(
					$applyQuery({ query, select: select({ database }) }),
				),
			);
		},
	};

	return instance;
};
