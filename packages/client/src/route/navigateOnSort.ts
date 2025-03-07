export namespace navigateOnSort {
	export namespace Navigate {
		export interface Props {
			search: (props: {
				sort: Record<string, "asc" | "desc" | undefined>;
			}) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnSort = (navigate: navigateOnSort.Navigate) => {
	return (sort: Record<string, "asc" | "desc" | undefined>) =>
		navigate({
			search: (search) => ({
				...search,
				sort,
			}),
		});
};
