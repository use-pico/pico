import { createContext } from "react";
import { createTabsStore } from "./createTabsStore";

export const TabsContext = createContext<createTabsStore.Store>(
	createTabsStore({ defaultTab: undefined, hidden: [] }),
);
