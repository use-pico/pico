import { hashOf } from "@use-pico/common";
import {
	useEffect,
	useMemo,
	type PropsWithChildren
} from "react";
import type { IStore } from "./IStore";

export namespace StoreProvider {
	export type Props<
		TStore extends IStore<any>,
	> = PropsWithChildren<{
		store: Pick<IStore.Store<TStore>, "Context" | "store">;
		values: TStore["values"];
	}>;
}

export const StoreProvider = <
	TStore extends IStore<any>,
>(
	{
		store: {
				   Context,
				   store,
			   },
		values,
		children,
	}: StoreProvider.Props<TStore>
) => {
	const memo = useMemo(() => store(values), []);
	useEffect(() => {
		if (values) {
			memo.setState(values);
		}
	}, [hashOf(values)]);
	return <Context.Provider value={memo}>
		{children}
	</Context.Provider>;
};
