import {
	type CursorSchema,
	type FilterSchema,
	tryZodError,
} from "@use-pico/common";
import type { InferResult, SelectQueryBuilder } from "kysely";
import { z } from "zod";
import type { EnsureOutput } from "./EnsureOutput";

export namespace withList {
	export namespace Query {
		export interface Props<
			TSelect extends SelectQueryBuilder<any, any, any>,
			TFilter extends FilterSchema.Type,
		> {
			select: TSelect;
			where?: TFilter | null;
		}
	}

	export interface Props<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
		TOutputSchema extends z.ZodSchema,
	> {
		select: TSelect;
		query?(props: Query.Props<TSelect, TFilter>): TSelect;

		/**
		 * Output must match the result of the select query.
		 */
		output: EnsureOutput<TSelect, TOutputSchema>;

		filter?: TFilter | null;
		where?: TFilter | null;
		cursor?: CursorSchema.Type | null;
	}

	export type Callback<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
		TOutputSchema extends z.ZodSchema,
	> = (
		props: Props<TSelect, TFilter, TOutputSchema>,
	) => Promise<InferResult<TSelect>>;
}

export const withList = async <
	TSelect extends SelectQueryBuilder<any, any, any>,
	TFilter extends FilterSchema.Type,
	TOutputSchema extends z.ZodSchema,
>({
	select,
	query = () => select,
	output,
	filter,
	where,
	cursor,
}: withList.Props<TSelect, TFilter, TOutputSchema>): Promise<
	z.infer<TOutputSchema>[]
> => {
	const limit = (select: SelectQueryBuilder<any, any, any>): TSelect => {
		let $select = select;

		if (cursor) {
			$select = select
				.limit(cursor.size)
				.offset(cursor.page * cursor.size);
		}

		return $select as TSelect;
	};

	return tryZodError(
		z.array(output as TOutputSchema),
		await limit(
			query({
				select: query({
					select,
					where,
				}),
				where: filter,
			}),
		).execute(),
	);
};
