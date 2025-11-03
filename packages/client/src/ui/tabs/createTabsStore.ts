import { create, type StoreApi, type UseBoundStore } from "zustand";

export namespace createTabsStore {
	export interface Props {
		tab: string | undefined;
		hidden: string[];
	}

	export interface Instance {
		tab: string | undefined;
		hidden: string[];
		setCurrent(current: string): void;
	}

	export type Store = UseBoundStore<StoreApi<Instance>>;
}

export const createTabsStore = ({
	tab,
	hidden,
}: createTabsStore.Props): createTabsStore.Store => {
	return create((set) => ({
		tab,
		hidden,
		setCurrent: (tab: string) => {
			set({
				tab,
			});
		},
	}));
};
