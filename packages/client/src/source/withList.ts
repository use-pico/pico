import type { CursorSchema, FilterSchema } from "@use-pico/common";
import type { InferResult, SelectQueryBuilder } from "kysely";

export namespace withList {
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
		cursor?: CursorSchema.Type;
	}

	export type Callback<
		TSelect extends SelectQueryBuilder<any, any, any>,
		TFilter extends FilterSchema.Type,
	> = (props: Props<TSelect, TFilter>) => Promise<any>;
}

export const withList = async <
	TSelect extends SelectQueryBuilder<any, any, any>,
	TFilter extends FilterSchema.Type,
>({
	select,
	query = () => select,
	filter,
	where,
	cursor,
}: withList.Props<TSelect, TFilter>): Promise<InferResult<TSelect>[]> => {
	const limit = (select: SelectQueryBuilder<any, any, any>): TSelect => {
		let $select = select;

		if (cursor) {
			$select = select
				.limit(cursor.size)
				.offset(cursor.page * cursor.size);
		}

		return $select as TSelect;
	};

	return limit(
		query({
			select: query({
				select,
				where,
			}),
			where: filter,
		}),
	).execute() as Promise<InferResult<TSelect>[]>;
};
