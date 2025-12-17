import type { SelectQueryBuilder, Simplify } from "kysely";
import type { z } from "zod";
import type { FilterSchema } from "../schema/FilterSchema";
import { tryZodError } from "../schema/tryZodError";

export namespace withFetch {
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
	}

	export type Callback<
		TOutputSchema extends z.ZodSchema,
		TSelect extends SelectQueryBuilder<any, any, Output<TOutputSchema>>,
		TFilter extends FilterSchema.Type,
	> = (
		props: Props<TOutputSchema, TSelect, TFilter>,
	) => Promise<Output<TOutputSchema> | undefined>;
}

export const withFetch = async <
	TOutputSchema extends z.ZodSchema,
	TSelect extends SelectQueryBuilder<
		any,
		any,
		withFetch.Output<TOutputSchema>
	>,
	TFilter extends FilterSchema.Type,
>({
	select,
	query = () => select,
	output,
	filter,
	where,
}: withFetch.Props<TOutputSchema, TSelect, TFilter>): Promise<
	z.infer<TOutputSchema> | undefined
> => {
	const result = await query({
		select: query({
			select,
			where,
		}),
		where: filter,
	}).executeTakeFirst();

	if (!result) {
		return undefined;
	}

	return tryZodError(output, result);
};
