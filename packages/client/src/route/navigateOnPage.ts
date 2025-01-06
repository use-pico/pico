export namespace navigateOnPage {
	export namespace Navigate {
		export interface Props {
			search: (props: { cursor: { page: number } }) => any;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnPage = (navigate: navigateOnPage.Navigate) => {
	return (page: number) => {
		navigate({
			search: ({ cursor, ...rest }) => ({
				...rest,
				cursor: { ...cursor, page },
			}),
		});
	};
};
