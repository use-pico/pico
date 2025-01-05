import {
    useQuery,
    type UseQueryOptions
} from "@tanstack/react-query";
import type {
    CountSchema,
    EntitySchema,
    FilterSchema,
    ShapeSchema,
    withSource,
    withSourceSchema,
} from "@use-pico/common";

export namespace useCountQuery {
	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<
			EntitySchema,
			ShapeSchema,
			FilterSchema
		>,
	> extends Omit<withSource.Query<TSchema>, "cursor"> {
		source: withSource.Instance<TDatabase, TSchema>;
		options?: Omit<
			UseQueryOptions<CountSchema.Type, Error>,
			"queryKey" | "queryFn"
		>;
	}
}

export const useCountQuery = <
	TDatabase,
	TSchema extends withSourceSchema.Instance<
		EntitySchema,
		ShapeSchema,
		FilterSchema
	>,
>({
	source,
	where,
	filter,
	options,
}: useCountQuery.Props<TDatabase, TSchema>) => {
	return useQuery({
		queryKey: ["useCountQuery", source.name, { where, filter }],
		async queryFn(): Promise<CountSchema.Type> {
			return source.db
				.transaction()
				.execute(async (tx): Promise<CountSchema.Type> => {
					return source.count$({
						tx,
						where,
						filter,
					});
				});
		},
		...options,
	});
};
