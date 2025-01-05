import type { QueryClient } from "@tanstack/react-query";
import type {
    CountSchema,
    withSource,
    withSourceSchema,
} from "@use-pico/common";
import type { Transaction } from "kysely";

export namespace withCountLoader {
	export interface Props<
		TDatabase,
		TSchema extends withSourceSchema.Instance<any, any, any>,
	> extends Omit<withSource.Query<TSchema>, "cursor"> {
		tx: Transaction<TDatabase>;
		queryClient: QueryClient;
		source: withSource.Instance<TDatabase, TSchema>;
	}
}

export const withCountLoader = async <
	TDatabase,
	TSchema extends withSourceSchema.Instance<any, any, any>,
>({
	tx,
	queryClient,
	source,
	where,
	filter,
}: withCountLoader.Props<TDatabase, TSchema>) => {
	return queryClient.ensureQueryData({
		queryKey: ["withCountLoader", source.name, { where, filter }],
		async queryFn(): Promise<CountSchema.Type> {
			return source.count$({ tx, where, filter });
		},
	});
};
