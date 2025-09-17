import { createContext } from "react";
import { createToneStore } from "./createToneStore";

export const ToneContext = createContext<createToneStore.Hook>(
	createToneStore({
		defaultTone: "primary",
		defaultTheme: "light",
	}),
);
