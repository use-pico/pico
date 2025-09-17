import { create, type StoreApi, type UseBoundStore } from "zustand";

export namespace createModalStore {
	export interface Props {
		defaultOpen?: boolean;
	}

	export interface Store {
		isOpen: boolean;
		open(): void;
		close(): void;
		toggle(isOpen: boolean): void;
	}

	export type Hook = UseBoundStore<StoreApi<Store>>;
}

export const createModalStore = ({
	defaultOpen = false,
}: createModalStore.Props): createModalStore.Hook => {
	return create<createModalStore.Store>((set) => ({
		isOpen: defaultOpen,
		open() {
			set({
				isOpen: true,
			});
		},
		close() {
			set({
				isOpen: false,
			});
		},
		toggle(isOpen: boolean) {
			set({
				isOpen,
			});
		},
	}));
};
