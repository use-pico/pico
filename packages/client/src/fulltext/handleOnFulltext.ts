import type { Fulltext } from "./Fulltext";

export namespace handleOnFulltext {
	export namespace Navigate {
		export interface Props {
			search: (props: {
				cursor: { page: number };
				global?: { fulltext?: string | null };
			}) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const handleOnFulltext = (navigate: handleOnFulltext.Navigate) => {
	return (text: Fulltext.Value) => {
		navigate({
			search: ({ cursor, global, ...rest }) => ({
				...rest,
				global: {
					...global,
					fulltext: text,
				},
				cursor: { ...cursor, page: text ? 0 : cursor.page },
			}),
			replace: Boolean(text),
		});
	};
};
