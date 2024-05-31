"use client";

import {createStore} from "../store/createStore";
import type {IStore} from "../store/IStore";

export namespace BlockStore {
	export type StoreProps = IStore<{
		block(block?: boolean): void;
		unblock(): void;
	}, {
		isBlock: boolean;
	}>;
}

export const BlockStore = createStore<BlockStore.StoreProps>({
	name: "BlockStore",
	factory: values => (set) => ({
		block: (block = true) => {
			set({isBlock: block});
		},
		unblock: () => {
			set({isBlock: false});
		},
		...values,
	}),
});
