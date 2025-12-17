import { createContext } from "react";
import { createToastStore } from "./createToastStore";

export const ToastContext = createContext<createToastStore.Hook>(
	createToastStore({
		maxCount: 5,
		durationMs: 2500,
	}),
);
