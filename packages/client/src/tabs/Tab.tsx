import { useCls } from "@use-pico/cls";
import { type FC, type PropsWithChildren, useContext } from "react";
import { TabCls } from "./TabCls";
import { TabsContext } from "./TabsContext";

export namespace Tab {
	export interface Props extends TabCls.Props<PropsWithChildren> {
		tab: string;
	}
}

export const Tab: FC<Tab.Props> = ({ tab, cls = TabCls, tweak, children }) => {
	const useStore = useContext(TabsContext);
	const store = useStore();

	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			active: tab === store.tab,
		}),
	}));

	return store.hidden.includes(tab) ? null : (
		<div
			className={slots.base()}
			onClick={() => store.setCurrent(tab)}
		>
			{children}
		</div>
	);
};
