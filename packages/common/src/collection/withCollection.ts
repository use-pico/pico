import type { SelectQueryBuilder, Simplify } from "kysely";
import { z } from "zod";
import type { CursorSchema } from "../schema/CursorSchema";
import type { FilterSchema } from "../schema/FilterSchema";
import { tryZodError } from "../schema/tryZodError";

export namespace withCollection {
	export type Output<TOutputSchema extends z.ZodSchema> = Simplify<
		z.infer<TOutputSchema>
	>;

	export interface Result<TOutput> {
		data: TOutput[];
		more: boolean;
	}

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
		cursor: CursorSchema.Type;
	}

	export type Callback<
		TOutputSchema extends z.ZodSchema,
		TSelect extends SelectQueryBuilder<any, any, Output<TOutputSchema>>,
		TFilter extends FilterSchema.Type,
	> = (
		props: Props<TOutputSchema, TSelect, TFilter>,
	) => Promise<Result<Output<TOutputSchema>>>;
}

export const withCollection = async <
	TOutputSchema extends z.ZodSchema,
	TSelect extends SelectQueryBuilder<
		any,
		any,
		withCollection.Output<TOutputSchema>
	>,
	TFilter extends FilterSchema.Type,
>({
	select,
	query = () => select,
	output,
	filter,
	where,
	cursor,
}: withCollection.Props<TOutputSchema, TSelect, TFilter>): Promise<
	withCollection.Result<z.infer<TOutputSchema>>
> => {
	const results = tryZodError(
		z.array(output),
		await query({
			select: query({
				select,
				where,
			}),
			where: filter,
		})
			.limit(cursor.size + 1)
			.offset(cursor.page * cursor.size)
			.execute(),
	);

	return {
		data: results.slice(0, cursor.size),
		more: results.length > cursor.size,
	};
};
