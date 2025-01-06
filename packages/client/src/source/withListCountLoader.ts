import type { QueryClient } from "@tanstack/react-query";
import type {
    CountSchema,
    withSource,
    withSourceSchema,
} from "@use-pico/common";
import type { Transaction } from "kysely";

export namespace withListCountLoader {
	export interface Result<
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> {
		data: TSchema["~output-array"];
		count: CountSchema.Type;
	}

	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> extends withSource.Query<TSchema> {
		tx: Transaction<TDatabase>;
		queryClient: QueryClient;
		source: withSource.Instance<TDatabase, TSchema>;
	}
}

export const withListCountLoader = async <
	TDatabase,
	TSchema extends withSourceSchema.Instance<any, any, any>,
>({
	tx,
	queryClient,
	source,
	where,
	filter,
	cursor,
	sort,
}: withListCountLoader.Props<TDatabase, TSchema>): Promise<
	withListCountLoader.Result<TSchema>
> => {
	return queryClient.ensureQueryData({
		queryKey: [
			"withListCountLoader",
			source.name,
			{ where, filter, cursor, sort },
		],
		async queryFn(): Promise<withListCountLoader.Result<TSchema>> {
			return {
				data: await source.list$({ tx, where, filter, cursor, sort }),
				count: await source.count$({ tx, where, filter }),
			};
		},
	});
};
