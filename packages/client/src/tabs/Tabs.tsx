import { type FC, type PropsWithChildren, useMemo } from "react";
import { createTabsStore } from "./createTabsStore";
import { TabsContext } from "./TabsContext";

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
		defaultHidden?: string[];
	}
}

export const Tabs: FC<Tabs.Props> = ({
	defaultTab,
	defaultHidden = [],
	children,
}) => {
	return (
		<TabsContext.Provider
			value={useMemo(
				() =>
					createTabsStore({
						tab: defaultTab,
						hidden: defaultHidden,
					}),
				[
					defaultHidden,
					defaultTab,
				],
			)}
		>
			{children}
		</TabsContext.Provider>
	);
};
