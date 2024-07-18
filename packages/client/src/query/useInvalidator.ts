import {
	type QueryKey,
	useQueryClient
}                          from "@tanstack/react-query";
import {type IInvalidator} from "./IInvalidator";

export namespace useInvalidator {
	export interface Props {
		invalidator: IInvalidator;
	}
}

export const useInvalidator = (
	{
		invalidator: {
						 invalidator,
						 key
					 },
	}: useInvalidator.Props
) => {
	const queryClient = useQueryClient();
	return invalidator ? (async () => {
		const keys = await invalidator({
			queryClient,
		});
		if (Array.isArray(keys)) {
			/**
			 * Optimistic Promise.all, but in this case it looks quite "stable"
			 */
			await Promise.all(
				(keys as QueryKey[]).map(key => {
					return queryClient.invalidateQueries({
						queryKey: key,
					});
				})
			);
		}
	}) : (async () => {
		return queryClient.invalidateQueries({
			queryKey: key,
		});
	});
};
