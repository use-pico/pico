import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { invalidator } from "./invalidator";

export const useInvalidator = (keys: QueryKey[]) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return async ({ route = true }: { route?: boolean }) => {
		try {
			await invalidator({
				keys,
				queryClient,
			});
		} finally {
			route && (await router.invalidate({ sync: true }));
		}
	};
};
