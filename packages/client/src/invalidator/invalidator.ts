import type { QueryClient, QueryKey } from "@tanstack/react-query";

export namespace invalidator {
	export interface Props {
		queryClient: QueryClient;
		keys: QueryKey[];
	}
}

export const invalidator = async ({
	queryClient,
	keys,
}: invalidator.Props): Promise<any> => {
	for await (const key of keys) {
		await queryClient.invalidateQueries({
			queryKey: key,
			refetchType: "all",
		});
	}
};
