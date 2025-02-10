import { useContext, type FC, type PropsWithChildren } from "react";
import { TabCss } from "./TabCss";
import { TabsContext } from "./TabsContext";

export namespace Tab {
	export interface Props extends TabCss.Props<PropsWithChildren> {
		tab: string;
	}
}

export const Tab: FC<Tab.Props> = ({
	tab,
	variant,
	tva = TabCss,
	css,
	children,
}) => {
	const useStore = useContext(TabsContext);
	const store = useStore();

	const tv = tva({ active: tab === store.tab, ...variant, css }).slots;
	return store.hidden.includes(tab) ?
			null
		:	<div
				className={tv.base()}
				onClick={() => store.setCurrent(tab)}
			>
				{children}
			</div>;
};
