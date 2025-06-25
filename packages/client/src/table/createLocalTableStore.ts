import { create, type StoreApi, type UseBoundStore } from "zustand";
import type { Fulltext } from "../fulltext/Fulltext";

export namespace createLocalTableStore {
	export interface Props {
		defaultPage?: number;
		defaultSize?: number;
		defaultSelection?: string[];
		defaultFulltext?: string;
	}

	export interface Instance {
		page: number;
		setPage(page: number): void;

		size: number;
		setSize(size: number): void;

		selection: string[];
		setSelection(selection: string[]): void;

		fulltext: Fulltext.Value;
		setFulltext(fulltext: Fulltext.Value): void;
	}

	export type Store = UseBoundStore<StoreApi<Instance>>;
}

/**
 * Creates store for a table with locale state (e.g. when you don't want to manage table's state in an URL and so on).
 */
export const createLocalTableStore = ({
	defaultPage = 0,
	defaultSize = 15,
	defaultSelection = [],
	defaultFulltext = "",
}: createLocalTableStore.Props): createLocalTableStore.Store => {
	return create<createLocalTableStore.Instance>((set) => ({
		page: defaultPage,
		setPage(page) {
			set({
				page,
			});
		},
		size: defaultSize,
		setSize(size) {
			set({
				size,
			});
		},
		selection: defaultSelection,
		setSelection(selection) {
			set({
				selection,
			});
		},
		fulltext: defaultFulltext,
		setFulltext(fulltext) {
			set({
				fulltext,
			});
		},
	}));
};
