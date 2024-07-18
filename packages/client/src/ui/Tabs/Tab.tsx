import { Css, cssOf } from "@use-pico/common";
import { type FC, type PropsWithChildren } from "react";
import { TabsStore } from "./TabsStore";

export namespace Tab {
	export interface Props extends PropsWithChildren, Css.Style {
		tab: string;
	}
}

export const Tab: FC<Tab.Props> = ({ tab, children, css }) => {
	const tabStore = TabsStore.useSelector(({ tab, setTab, hidden }) => ({
		tab,
		setTab,
		hidden,
	}));
	return tabStore.hidden.includes(tab) ?
			null
		:	<div
				className={cssOf(
					"flex flex-row items-center gap-1",
					"cursor-pointer text-slate-600 border-sky-400",
					"border-b-2 border-transparent",
					"hover:border-sky-400",
					tab === tabStore.tab &&
						"cursor-default font-semibold text-slate-800 border-sky-400",
					css,
				)}
				onClick={() => tabStore.setTab(tab)}
			>
				{children}
			</div>;
};
