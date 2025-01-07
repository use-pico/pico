import type { QueryClient } from "@tanstack/react-query";
import type { withSource, withSourceSchema } from "@use-pico/common";
import type { Transaction } from "kysely";

export namespace withListLoader {
	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> extends withSource.Query<TSchema> {
		tx: Transaction<TDatabase>;
		queryClient: QueryClient;
		source: withSource.Instance<TDatabase, TSchema>;
	}
}

export const withListLoader = async <
	TDatabase,
	TSchema extends withSourceSchema.Instance<any, any, any>,
>({
	tx,
	queryClient,
	source,
	where,
	filter,
	cursor,
}: withListLoader.Props<TDatabase, TSchema>): Promise<
	TSchema["~output-array"]
> => {
	return queryClient.ensureQueryData({
		queryKey: ["withListLoader", source.name, { where, filter, cursor }],
		async queryFn(): Promise<TSchema["~output-array"]> {
			console.log("Loading", source.name);
            
			return source.list$({ tx, where, filter, cursor });
		},
	});
};
