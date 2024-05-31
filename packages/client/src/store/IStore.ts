import {
	type Context,
	FC
}                                        from "react";
import {type StoreApi}                   from "zustand";
import {type StoreProvider}              from "./StoreProvider";
import {type useStore as useCoolStore}   from "./useStore";
import {type useStore$ as useCoolStore$} from "./useStore$";

/**
 * Defines all store related types.
 *
 * @category store
 */
export namespace IStore {
	/**
	 * Basic shape of store.
	 */
	export type Type = Record<string, any>;

	/**
	 * Combined store shape based on it's props and `external` values.
	 */
	export type Props<TStore extends IStore<any, any>> =
		TStore["props"]
		& TStore["values"];

	/**
	 * Zustand store API.
	 */
	export type Api<
		TStore extends IStore<any>
	> = StoreApi<Props<TStore>>;

	/**
	 * Store itself with Context, Provider and hooks, all connected to on store type.
	 *
	 * @template TStore Store definition (props & values).
	 */
	export interface Store<
		TStore extends IStore<any>
	> {
		/**
		 * Proxy property, only used to provide a store type.
		 */
		Type: TStore;
		name?: string;
		Context: Context<Api<TStore> | null>;
		Provider: FC<Omit<StoreProvider.Props<TStore>, "store">>;

		store(values: TStore["values"]): Api<TStore>;

		/**
		 * Use whole store
		 */
		useStore(): ReturnType<typeof useCoolStore<TStore>>;

		/**
		 * Use whole optional store
		 */
		useStore$(): ReturnType<typeof useCoolStore$<TStore>>;

		/**
		 * Use the store with a selector
		 */
		useSelector<TValue>(selector: (state: TStore["props"] & TStore["values"]) => TValue): ReturnType<typeof useCoolStore<TStore, TValue>>;

		/**
		 * Use optional store with a selector
		 */
		useSelector$<TValue>(selector: (state: TStore["props"] & TStore["values"]) => TValue): ReturnType<typeof useCoolStore$<TStore, TValue>>;
	}
}

/**
 * Defines shape of the store.
 *
 * @category store
 */
export interface IStore<
	TProps extends IStore.Type,
	TValues extends IStore.Type = IStore.Type,
> {
	/**
	 * Props are the core parts of a store (internal implementation).
	 */
	props: TProps;
	/**
	 * Values are required to be passed to the store.
	 */
	values: TValues;
}
