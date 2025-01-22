import type { CountSchema, CursorSchema, FilterSchema } from "@use-pico/common";
import { type SelectQueryBuilder } from "kysely";
import { z } from "zod";
import type { EnsureOutput } from "./EnsureOutput";
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

		output: EnsureOutput<TSelect, TOutputSchema>;

		filter?: TFilter;
		where?: TFilter;
		cursor?: CursorSchema.Type;
	}

	export type PropsEx<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
		TOutputSchema extends z.ZodSchema,
	> = Omit<
		Props<TSelect, TFilter, TOutputSchema>,
		"select" | "query" | "output"
	>;

	export interface Result<TData> {
		data: TData[];
		count: CountSchema.Type;
	}

	export type Callback<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
		TOutputSchema extends z.ZodSchema,
	> = (
		props: Props<TSelect, TFilter, TOutputSchema>,
	) => Promise<Result<z.infer<TOutputSchema>>>;
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
}: withListCount.Props<TSelect, TFilter, TOutputSchema>): Promise<
	withListCount.Result<z.infer<TOutputSchema>>
> => {
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
