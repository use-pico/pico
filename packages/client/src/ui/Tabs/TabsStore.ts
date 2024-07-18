import { createStore } from "../../store/createStore";
import { IStore } from "../../store/IStore";

export namespace TabsStore {
	export type Store = IStore<
		{
			setTab(tab: string): void;
		},
		{
			tab: string;
			hidden: string[];
		}
	>;
}

export const TabsStore = createStore<TabsStore.Store>({
	name: "TabsStore",
	factory: (values) => (set) => ({
		setTab: (tab) => {
			set({ tab });
		},
		...values,
	}),
});
