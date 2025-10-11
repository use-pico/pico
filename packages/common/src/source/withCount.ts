import type { SelectQueryBuilder } from "kysely";
import type { CountSchema } from "./CountSchema";
import type { FilterSchema } from "./FilterSchema";

export namespace withCount {
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
	> {
		select: TSelect;
		query?(props: Query.Props<TSelect, TFilter>): TSelect;

		filter?: TFilter | null;
		where?: TFilter | null;
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
