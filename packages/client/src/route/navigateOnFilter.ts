export namespace navigateOnFilter {
	export namespace Navigate {
		export interface Props {
			search: (props: { cursor: { page: number } }) => any;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnFilter = (navigate: navigateOnFilter.Navigate) => {
	return (filter: Record<string, any>) =>
		navigate({
			search: ({ cursor, ...prev }) => ({
				...prev,
				filter,
				cursor: { ...cursor, page: 0 },
			}),
		});
};
