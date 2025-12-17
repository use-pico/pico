import type { SelectQueryBuilder, Simplify } from "kysely";
import { z } from "zod";
import type { CursorSchema } from "../schema/CursorSchema";
import type { FilterSchema } from "../schema/FilterSchema";
import { tryZodError } from "../schema/tryZodError";

export namespace withList {
	export type Output<TOutputSchema extends z.ZodSchema> = Simplify<
		z.infer<TOutputSchema>
	>;

	export namespace Query {
		export interface Props<
			TOutputSchema extends z.ZodSchema,
			TSelect extends SelectQueryBuilder<any, any, Output<TOutputSchema>>,
			TFilter extends FilterSchema.Type,
		> {
			select: TSelect;
			where?: TFilter;
		}
	}

	export interface Props<
		TOutputSchema extends z.ZodSchema,
		TSelect extends SelectQueryBuilder<any, any, Output<TOutputSchema>>,
		TFilter extends FilterSchema.Type,
	> {
		select: TSelect;
		query?(props: Query.Props<TOutputSchema, TSelect, TFilter>): TSelect;

		output: TOutputSchema;

		filter?: TFilter;
		where?: TFilter;
		cursor?: CursorSchema.Type;
	}

	export type Callback<
		TOutputSchema extends z.ZodSchema,
		TSelect extends SelectQueryBuilder<any, any, Output<TOutputSchema>>,
		TFilter extends FilterSchema.Type,
	> = (
		props: Props<TOutputSchema, TSelect, TFilter>,
	) => Promise<Output<TOutputSchema>[]>;
}

export const withList = async <
	TOutputSchema extends z.ZodSchema,
	TSelect extends SelectQueryBuilder<
		any,
		any,
		withList.Output<TOutputSchema>
	>,
	TFilter extends FilterSchema.Type,
>({
	select,
	query = () => select,
	output,
	filter,
	where,
	cursor,
}: withList.Props<TOutputSchema, TSelect, TFilter>): Promise<
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
		z.array(output),
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
