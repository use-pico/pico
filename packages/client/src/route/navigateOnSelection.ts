import type { StateType } from "@use-pico/common";

export namespace navigateOnSelection {
	export namespace Navigate {
		export interface Props {
			search: (props: { selection: any[] }) => any;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnSelection = (
	value: any[],
	navigate: navigateOnSelection.Navigate,
): StateType<any[]> => {
	return {
		value,
		set(selection) {
			navigate({
				search(prev) {
					return {
						...prev,
						selection,
					};
				},
			});
		},
	};
};
