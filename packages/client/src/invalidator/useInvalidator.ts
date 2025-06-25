import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { invalidator } from "./invalidator";

export namespace useInvalidator {
	export namespace Invalidator {
		export interface Props {
			route?: boolean;
		}

		export type Callback = (props?: Props) => Promise<void>;
	}
}

export const useInvalidator = (
	keys: QueryKey[],
): useInvalidator.Invalidator.Callback => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return async ({ route = true } = {}) => {
		try {
			await invalidator({
				keys,
				queryClient,
			});
		} finally {
			route &&
				(await router.invalidate({
					sync: true,
				}));
		}
	};
};
