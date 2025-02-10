import { useContext, type FC, type PropsWithChildren } from "react";
import { TabPaneCss } from "./TabPaneCss";
import { TabsContext } from "./TabsContext";

export namespace TabPane {
	export interface Props extends TabPaneCss.Props<PropsWithChildren> {
		tab: string;
	}
}

export const TabPane: FC<TabPane.Props> = ({
	tab,
	variant,
	tva = TabPaneCss,
	css,
	children,
}) => {
	const useStore = useContext(TabsContext);
	const hidden = useStore((state) => state.hidden);
	const currentTab = useStore((state) => state.tab);

	const tv = tva({ hidden: tab !== currentTab, ...variant, css }).slots;

	return hidden.includes(tab) ? null : (
			<div className={tv.base()}>{children}</div>
		);
};
