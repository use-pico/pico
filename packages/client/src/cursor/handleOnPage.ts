export namespace handleOnPage {
	export namespace Navigate {
		export interface Props {
			search: (props: { cursor: { page: number } }) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const handleOnPage = (navigate: handleOnPage.Navigate) => {
	return (page: number) => {
		navigate({
			search: ({ cursor, ...rest }) => ({
				...rest,
				cursor: { ...cursor, page },
			}),
		});
	};
};
