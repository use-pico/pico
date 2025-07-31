import type { StateType } from "@use-pico/common";

export namespace navigateOnFilter {
	export namespace Navigate {
		export interface Props {
			search: (props: {
				cursor: {
					page: number;
				};
			}) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnFilter = (
	value: Record<string, any> | undefined,
	navigate: navigateOnFilter.Navigate,
): StateType<Record<string, any> | undefined> => {
	return {
		value,
		set(filter) {
			navigate({
				search: ({ cursor, ...prev }) => ({
					...prev,
					filter,
					cursor: {
						...cursor,
						page: 0,
					},
				}),
			});
		},
	};
};
