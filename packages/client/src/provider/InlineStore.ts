import { createStore } from "../store/createStore";
import { IStore } from "../store/IStore";

/**
 * Simple store used to provide `inline` flag for components supporting inline mode.
 */
export namespace InlineStore {
	export type Store = IStore<IStore.Type, {
		inline: boolean;
	}>;
}

export const InlineStore = createStore<InlineStore.Store>({
	name:    "InlineStore",
	factory: values => () => values,
});
