import type { QueryClient } from "@tanstack/react-query";

export namespace invalidator {
	export interface Props {
		queryClient: QueryClient;
		keys: string[];
	}
}

export const invalidator = async ({ queryClient, keys }: invalidator.Props) => {
	return Promise.all(
		keys.map((key) =>
			queryClient.refetchQueries({
				queryKey: [key],
			}),
		),
	);
};
