import { Css, cssOf } from "@use-pico/common";
import { type FC, type PropsWithChildren } from "react";
import { TabsStore } from "./TabsStore";

export namespace TabPane {
	export interface Props extends PropsWithChildren, Css.Style {
		tab: string;
	}
}

export const TabPane: FC<TabPane.Props> = ({ tab, css, children }) => {
	const tabStore = TabsStore.useSelector(({ tab, hidden }) => ({
		tab,
		hidden,
	}));

	return tabStore.hidden.includes(tab) ?
			null
		:	<div className={cssOf(tab !== tabStore.tab && "hidden", css)}>
				{children}
			</div>;
};
