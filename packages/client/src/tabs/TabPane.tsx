import { useCls } from "@use-pico/cls";
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
	cls = TabPaneCls,
	tweak,
	children,
}) => {
	const useStore = useContext(TabsContext);
	const hidden = useStore((state) => state.hidden);
	const currentTab = useStore((state) => state.tab);

	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			hidden: tab !== currentTab,
		}),
	}));

	return hidden.includes(tab) ? null : (
		<div
			data-ui="TabPane-root"
			className={slots.root()}
		>
			{children}
		</div>
	);
};
