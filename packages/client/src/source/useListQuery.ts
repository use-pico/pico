import {
    useQuery,
    useQueryClient,
    type UseQueryOptions,
} from "@tanstack/react-query";
import type { withSource, withSourceSchema } from "@use-pico/common";
import { withListCountLoader } from "./withListCountLoader";

export namespace useListQuery {
	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> extends withSource.Query<TSchema> {
		source: withSource.Instance<TDatabase, TSchema>;
		options?: Omit<
			UseQueryOptions<withListCountLoader.Result<TSchema>, Error>,
			"queryKey" | "queryFn"
		>;
	}
}

export type useListQuery<
	TDatabase,
	TSchema extends withSourceSchema.Instance<any, any, any>,
> = typeof useListQuery<TDatabase, TSchema>;

export const useListQuery = <
	TDatabase,
	TSchema extends withSourceSchema.Instance<any, any, any>,
>({
	source,
	where,
	filter,
	cursor,
	options,
}: useListQuery.Props<TDatabase, TSchema>) => {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: ["useListQuery", source.name, { where, filter, cursor }],
		async queryFn(): Promise<withListCountLoader.Result<TSchema>> {
			return source.db
				.transaction()
				.execute(async (tx): Promise<withListCountLoader.Result<TSchema>> => {
					return withListCountLoader({
						queryClient,
						tx,
						source,
						where,
						filter,
						cursor,
					});
				});
		},
		...options,
	});
};
