import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { invalidator } from "../invalidator/invalidator";

export namespace useSourceInvalidator {
	export interface Props {
		sources: { name: string }[];
		/**
		 * Invalidate route?
		 */
		route?: boolean;
		queries?: QueryKey[];
	}
}

export const useSourceInvalidator = ({
	sources,
	route = true,
	queries = [],
}: useSourceInvalidator.Props) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return async () => {
		await invalidator({
			queryClient,
			keys: [
				...sources.map(({ name }) => ["withCountLoader", name]),
				...sources.map(({ name }) => ["withFetchLoader", name]),
				...sources.map(({ name }) => ["withListLoader", name]),
				...sources.map(({ name }) => ["useListQuery", name]),
				...sources.map(({ name }) => ["withListCountLoader", name]),
				...sources.map(({ name }) => ["useCountQuery", name]),
				...queries,
			],
		});

		if (route) {
			await router.invalidate();
		}
	};
};
