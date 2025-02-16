import { create, type StoreApi, type UseBoundStore } from "zustand";

export namespace createModalStore {
	export interface Props {
		defaultOpen?: boolean;
	}

	export interface Instance {
		isOpen: boolean;
		open(): void;
		close(): void;
		toggle(isOpen: boolean): void;
	}

	export type Store = UseBoundStore<StoreApi<Instance>>;
}

export const createModalStore = ({
	defaultOpen = false,
}: createModalStore.Props): createModalStore.Store => {
	return create<createModalStore.Instance>((set) => ({
		isOpen: defaultOpen,
		open() {
			set({ isOpen: true });
		},
		close() {
			set({ isOpen: false });
		},
		toggle(isOpen: boolean) {
			set({ isOpen });
		},
	}));
};
