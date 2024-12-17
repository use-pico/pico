export namespace handleOnSize {
	export namespace Navigate {
		export interface Props {
			search: (props: { cursor: { page: number } }) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const handleOnSize = (navigate: handleOnSize.Navigate) => {
	return (size: number) => {
		navigate({
			search: ({ cursor, ...rest }) => ({
				...rest,
				cursor: { ...cursor, size, page: 0 },
			}),
		});
	};
};
