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

export const navigateOnFilter = (navigate: navigateOnFilter.Navigate) => {
	return (filter: Record<string, any>) => {
		return navigate({
			search: ({ cursor, ...prev }) => ({
				...prev,
				filter,
				cursor: {
					...cursor,
					page: 0,
				},
			}),
		});
	};
};
