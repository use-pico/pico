import type { FilterSchema } from "@use-pico/common";
import type { SelectQueryBuilder } from "kysely";
import type { z } from "zod";
import type { EnsureOutput } from "./EnsureOutput";

export namespace withFetch {
	export namespace Query {
		export interface Props<
			TSelect extends SelectQueryBuilder<any, any, any>,
			TFilter extends FilterSchema.Type,
		> {
			select: TSelect;
			where?: TFilter;
		}
	}

	export interface Props<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
		TOutputSchema extends z.ZodSchema,
	> {
		select: TSelect;
		query?(props: Query.Props<TSelect, TFilter>): TSelect;

		output: EnsureOutput<TSelect, TOutputSchema>;

		filter?: TFilter;
		where?: TFilter;
	}

	export type Callback<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
		TOutputSchema extends z.ZodSchema,
	> = (props: Props<TSelect, TFilter, TOutputSchema>) => Promise<any>;
}

export const withFetch = async <
	TSelect extends SelectQueryBuilder<any, any, any>,
	TFilter extends FilterSchema.Type,
	TOutputSchema extends z.ZodSchema,
>({
	select,
	query = () => select,
	output,
	filter,
	where,
}: withFetch.Props<TSelect, TFilter, TOutputSchema>): Promise<
	z.infer<TOutputSchema>
> => {
	return (output as TOutputSchema).parse(
		await query({
			select: query({
				select,
				where,
			}),
			where: filter,
		}).executeTakeFirstOrThrow(),
	);
};
