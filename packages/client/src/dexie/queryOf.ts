import {
    type CountSchema,
    type CursorSchema,
    type FilterSchema,
    fulltextOf,
    type IdentitySchema
} from "@use-pico/common";
import type { EntityTable } from "dexie";
import type { z } from "zod";

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
		TFilterSchema extends FilterSchema,
	> {
		source: EntityTable<z.infer<TEntitySchema>, "id">;
		schema: TEntitySchema;
		onFilter: Filter.Callback<TEntitySchema, TFilterSchema>;
	}

	export interface Instance<
		TEntitySchema extends IdentitySchema,
		TFilterSchema extends FilterSchema,
	> {
		query(query: Query<TFilterSchema>): Promise<z.infer<TEntitySchema>[]>;
		fetch(query: Query<TFilterSchema>): Promise<z.infer<TEntitySchema>>;
		count(
			query: Omit<Query<TFilterSchema>, "cursor">,
		): Promise<CountSchema.Type>;
	}
}

export const queryOf = <
	TEntitySchema extends IdentitySchema,
	TFilterSchema extends FilterSchema,
>({
	source,
	schema,
	onFilter,
}: queryOf.Props<TEntitySchema, TFilterSchema>): queryOf.Instance<
	TEntitySchema,
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

	return {
		async query(query) {
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
		},
		async fetch(query) {
			return schema.parse(
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
		},
		async count(query) {
			return {
				total: await source.count(),
				filter: await source
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
					.count(),
				where: await source
					.filter((entity) => {
						return $filter({
							entity,
							filter: query.where as z.infer<TFilterSchema>,
						});
					})
					.count(),
			};
		},
	};
};
