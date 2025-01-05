import type { QueryClient } from "@tanstack/react-query";
import type { withSource, withSourceSchema } from "@use-pico/common";
import type { Transaction } from "kysely";

export namespace withFetchLoader {
	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> extends Omit<withSource.Query<TSchema>, "cursor"> {
		tx: Transaction<TDatabase>;
		queryClient: QueryClient;
		source: withSource.Instance<TDatabase, TSchema>;
	}
}

export const withFetchLoader = async <
	TDatabase,
	TSchema extends withSourceSchema.Instance<any, any, any>,
>({
	tx,
	queryClient,
	source,
	where,
	filter,
}: withFetchLoader.Props<TDatabase, TSchema>): Promise<TSchema["~output"]> => {
	return queryClient.ensureQueryData({
		queryKey: ["withFetchLoader", source.name, { where, filter }],
		async queryFn(): Promise<TSchema["~output"]> {
			return source.fetchOrThrow$({
				tx,
				where,
				filter,
			});
		},
	});
};
