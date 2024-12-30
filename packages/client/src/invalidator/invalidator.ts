import type { QueryClient, QueryKey } from "@tanstack/react-query";

export namespace invalidator {
	export interface Props {
		queryClient: QueryClient;
		keys: QueryKey[];
	}
}

export const invalidator = async ({ queryClient, keys }: invalidator.Props) => {
	return Promise.all(
		keys.map((key) =>
			queryClient.refetchQueries({
				queryKey: key,
			}),
		),
	).catch((error) => {
		console.error(error);
	});
};
