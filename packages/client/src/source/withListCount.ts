import type { CountSchema, CursorSchema, FilterSchema } from "@use-pico/common";
import type { SelectQueryBuilder } from "kysely";
import { z } from "zod";
import { withCount } from "./withCount";
import { withList } from "./withList";

export namespace withListCount {
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

		output: TOutputSchema;

		filter?: TFilter;
		where?: TFilter;
		cursor?: CursorSchema.Type;
	}

	export type Callback<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
		TOutputSchema extends z.ZodSchema,
	> = (props: Props<TSelect, TFilter, TOutputSchema>) => Promise<any>;
}

export const withListCount = async <
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
}: withListCount.Props<TSelect, TFilter, TOutputSchema>): Promise<{
	data: z.infer<TOutputSchema>[];
	count: CountSchema.Type;
}> => {
	return {
		data: await withList({
			select,
			output,
			where,
			filter,
			query,
			cursor,
		}),
		count: await withCount({
			select,
			where,
			filter,
			query,
		}),
	};
};
