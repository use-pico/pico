import { createContext } from "react";
import { createVisibilityStore } from "../store/createVisibilityStore";

export const VisibilityContext = createContext<createVisibilityStore.Hook>(
	createVisibilityStore({
		defaultVisible: false,
		defaultTopProximity: false,
		defaultBottomProximity: false,
	}),
);
