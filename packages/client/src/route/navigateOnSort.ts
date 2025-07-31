import type { OrderSchema, StateType } from "@use-pico/common";

export namespace navigateOnSort {
	export namespace Navigate {
		export interface Props {
			search: (props: { sort: Record<string, OrderSchema.Type> }) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnSort = (
	value: Record<string, OrderSchema.Type>,
	navigate: navigateOnSort.Navigate,
): StateType<Record<string, OrderSchema.Type>> => {
	return {
		value,
		set(sort) {
			navigate({
				search: (search) => ({
					...search,
					sort,
				}),
			});
		},
	};
};
