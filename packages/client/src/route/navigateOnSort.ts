import type { OrderSchema } from "@use-pico/common";

export namespace navigateOnSort {
	export namespace Navigate {
		export interface Props {
			search: (props: { sort: Record<string, OrderSchema.Type> }) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnSort = (navigate: navigateOnSort.Navigate) => {
	return (sort: Record<string, OrderSchema.Type>) =>
		navigate({
			search: (search) => ({
				...search,
				sort,
			}),
		});
};
