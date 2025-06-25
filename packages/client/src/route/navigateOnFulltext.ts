import type { Fulltext } from "../fulltext/Fulltext";

export namespace navigateOnFulltext {
	export namespace Navigate {
		export interface Props {
			search: (props: {
				cursor: {
					page: number;
				};
				filter?: {
					fulltext?: string | null;
				};
			}) => any;
			replace?: boolean;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnFulltext = (
	current: Fulltext.Value,
	navigate: navigateOnFulltext.Navigate,
) => {
	return (text: Fulltext.Value) => {
		if ((text ?? "") === (current ?? "")) {
			return;
		}

		navigate({
			search: ({ cursor, filter, ...rest }) => ({
				...rest,
				filter: {
					...filter,
					fulltext: text,
				},
				cursor: {
					...cursor,
					page: text ? 0 : cursor.page,
				},
			}),
			replace: false,
		});
	};
};
