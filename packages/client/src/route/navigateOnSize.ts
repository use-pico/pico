export namespace navigateOnSize {
	export namespace Navigate {
		export interface Props {
			search: (props: { cursor: { page: number } }) => any;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnSize = (navigate: navigateOnSize.Navigate) => {
	return (size: number) => {
		navigate({
			search: ({ cursor, ...rest }) => ({
				...rest,
				cursor: { ...cursor, size, page: 0 },
			}),
		});
	};
};
