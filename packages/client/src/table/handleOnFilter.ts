export namespace handleOnFilter {
	export namespace Navigate {
		export interface Props {
			search: (props: { cursor: { page: number } }) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;

	export interface Props {
		navigate: Navigate;
		filter: Record<string, any>;
	}
}

export const handleOnFilter = ({ navigate, filter }: handleOnFilter.Props) => {
	navigate({
		search: ({ cursor, ...prev }) => ({
			...prev,
			filter,
			cursor: { ...cursor, page: 0 },
		}),
	});
};
