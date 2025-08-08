import { type FC, type PropsWithChildren, useContext } from "react";
import { TabCls } from "./TabCls";
import { TabsContext } from "./TabsContext";

export namespace Tab {
	export interface Props extends TabCls.Props<PropsWithChildren> {
		tab: string;
	}
}

export const Tab: FC<Tab.Props> = ({ tab, tva = TabCls, cls, children }) => {
	const useStore = useContext(TabsContext);
	const store = useStore();

	const classes = tva.create(cls, {
		variant: {
			active: tab === store.tab,
		},
	});

	return store.hidden.includes(tab) ? null : (
		<div
			className={classes.base}
			onClick={() => store.setCurrent(tab)}
		>
			{children}
		</div>
	);
};
