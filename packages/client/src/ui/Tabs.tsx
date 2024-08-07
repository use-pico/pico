import { PropsWithChildren, type FC } from "react";
import { TabsStore } from "./Tabs/TabsStore";

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
		defaultValue: string;
		hidden?: string[];
	}
}

export const Tabs: FC<Tabs.Props> = ({
	defaultValue,
	hidden = [],
	children,
}) => {
	return (
		<TabsStore.Provider
			values={{
				tab: defaultValue,
				hidden,
			}}
		>
			{children}
		</TabsStore.Provider>
	);
};
