export namespace navigateOnSelection {
	export namespace Navigate {
		export interface Props {
			search: (props: { selection: any[] }) => any;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnSelection = (navigate: navigateOnSelection.Navigate) => {
	return (selection: any[]) => {
		navigate({
			search(prev) {
				return {
					...prev,
					selection,
				};
			},
		});
	};
};
