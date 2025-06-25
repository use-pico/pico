import { type FC, type PropsWithChildren, useContext } from "react";
import { TabCls } from "./TabCls";
import { TabsContext } from "./TabsContext";

export namespace Tab {
	export interface Props extends TabCls.Props<PropsWithChildren> {
		tab: string;
	}
}

export const Tab: FC<Tab.Props> = ({
	tab,
	variant,
	tva = TabCls,
	css,
	children,
}) => {
	const useStore = useContext(TabsContext);
	const store = useStore();

	const { slots } = tva({
		active: tab === store.tab,
		...variant,
		css,
	});

	return store.hidden.includes(tab) ? null : (
		<div
			className={slots.base()}
			onClick={() => store.setCurrent(tab)}
		>
			{children}
		</div>
	);
};
