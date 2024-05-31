"use client";

import {createStore} from "../../store/createStore";
import type {IStore} from "../../store/IStore";

export namespace ModalStore {
	export type StoreProps = IStore<{}, {
		close(): void
	}>;
}

export const ModalStore = createStore<ModalStore.StoreProps>({
	name:    "ModalStore",
	factory: values => () => ({
		...values,
	}),
});
