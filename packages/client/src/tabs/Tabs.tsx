import { PropsWithChildren, type FC } from "react";
import { TabsContext } from "./TabsContext";
import { createTabsStore } from "./createTabsStore";

/**
 * Classic component with tabs.
 *
 * @group ui
 */
export namespace Tabs {
	/**
	 * Props for the `Tabs` component.
	 */
	export interface Props extends PropsWithChildren {
		/**
		 * Initial tab value.
		 */
		defaultTab: string;
		hidden?: string[];
	}
}

export const Tabs: FC<Tabs.Props> = ({ defaultTab, hidden = [], children }) => {
	return (
		<TabsContext.Provider value={createTabsStore({ defaultTab, hidden })}>
			{children}
		</TabsContext.Provider>
	);
};
