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

	const keys: QueryKey[] = [
		...sources.flatMap(({ name }) => [
			["withCountLoader", name],
			["withFetchLoader", name],
			["withListLoader", name],
			["withListCountLoader", name],
			["useListQuery", name],
			["useCountQuery", name],
		]),
		...queries,
	];

	return async () => {
		await invalidator({
			queryClient,
			keys,
		});

		if (route) {
			await router.invalidate();
		}
	};
};
