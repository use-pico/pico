import { createStore } from "../../store/createStore";
import type { IStore } from "../../store/IStore";

export namespace ModalStore {
	export type StoreProps = IStore<IStore.Type, {
		close(): void
	}>;
}

export const ModalStore = createStore<ModalStore.StoreProps>({
	name:    "ModalStore",
	factory: values => () => values,
});
