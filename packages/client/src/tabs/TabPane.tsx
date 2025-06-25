import { type FC, type PropsWithChildren, useContext } from "react";
import { TabPaneCls } from "./TabPaneCls";
import { TabsContext } from "./TabsContext";

export namespace TabPane {
	export interface Props extends TabPaneCls.Props<PropsWithChildren> {
		tab: string;
	}
}

export const TabPane: FC<TabPane.Props> = ({
	tab,
	variant,
	tva = TabPaneCls,
	css,
	children,
}) => {
	const useStore = useContext(TabsContext);
	const hidden = useStore((state) => state.hidden);
	const currentTab = useStore((state) => state.tab);

	const { slots } = tva({
		hidden: tab !== currentTab,
		...variant,
		css,
	});

	return hidden.includes(tab) ? null : (
		<div className={slots.base()}>{children}</div>
	);
};
