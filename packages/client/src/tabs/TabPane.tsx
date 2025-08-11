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
	tva = TabPaneCls,
	cls,
	children,
}) => {
	const useStore = useContext(TabsContext);
	const hidden = useStore((state) => state.hidden);
	const currentTab = useStore((state) => state.tab);

	const classes = tva.create(cls, ({ what }) => ({
		variant: what.variant({
			hidden: tab !== currentTab,
		}),
	}));

	return hidden.includes(tab) ? null : (
		<div className={classes.base()}>{children}</div>
	);
};
