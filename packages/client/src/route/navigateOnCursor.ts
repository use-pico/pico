import { navigateOnPage } from "./navigateOnPage";
import { navigateOnSize } from "./navigateOnSize";

export namespace navigateOnCursor {
	export namespace Navigate {
		export interface Props {
			search: (props: { cursor: { page: number } }) => any;
		}
	}

	export type Navigate = (props: Navigate.Props) => void;
}

export const navigateOnCursor = (navigate: navigateOnCursor.Navigate) => {
	return {
		onPage: navigateOnPage(navigate),
		onSize: navigateOnSize(navigate),
	} as const;
};
