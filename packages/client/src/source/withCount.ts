import type { CountSchema, FilterSchema } from "@use-pico/common";
import type { SelectQueryBuilder } from "kysely";

export namespace withCount {
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
	> {
		select: TSelect;
		query?(props: Query.Props<TSelect, TFilter>): TSelect;

		filter?: TFilter;
		where?: TFilter;
	}

	export type Callback<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
	> = (props: Props<TSelect, TFilter>) => Promise<any>;
}

export const withCount = async <
	TSelect extends SelectQueryBuilder<any, any, any>,
	TFilter extends FilterSchema.Type,
>({
	select,
	query = () => select,
	filter,
	where,
}: withCount.Props<TSelect, TFilter>): Promise<CountSchema.Type> => {
	return {
		total: (
			await select
				.clearSelect()
				.select((eb) => eb.fn.countAll<number>().as("count"))
				.executeTakeFirstOrThrow()
		).count,
		filter: (
			await query({
				select: query({
					select,
					where,
				}),
				where: filter,
			})
				.clearSelect()
				.select((eb) => eb.fn.countAll<number>().as("count"))
				.executeTakeFirstOrThrow()
		).count,
		where: (
			await query({
				select,
				where,
			})
				.clearSelect()
				.select((eb) => eb.fn.countAll<number>().as("count"))
				.executeTakeFirstOrThrow()
		).count,
	};
};
