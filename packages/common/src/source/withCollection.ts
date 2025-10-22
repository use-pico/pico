import type { SelectQueryBuilder } from "kysely";
import { z } from "zod";
import { tryZodError } from "../schema/tryZodError";
import type { CursorSchema } from "./CursorSchema";
import type { EnsureOutput } from "./EnsureOutput";
import type { FilterSchema } from "./FilterSchema";

export namespace withCollection {
	export interface Result<TOutput> {
		data: TOutput[];
		more: boolean;
	}

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
		cursor: CursorSchema.Type;
	}

	export type Callback<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
		TOutputSchema extends z.ZodSchema,
	> = (
		props: Props<TSelect, TFilter, TOutputSchema>,
	) => Promise<Result<z.infer<TOutputSchema>>>;
}

export const withCollection = async <
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
}: withCollection.Props<TSelect, TFilter, TOutputSchema>): Promise<
	withCollection.Result<z.infer<TOutputSchema>>
> => {
	const results = tryZodError(
		z.array(output as TOutputSchema),
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
