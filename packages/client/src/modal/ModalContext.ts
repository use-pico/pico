import { createContext } from "react";
import { createModalStore } from "./createModalStore";

export const ModalContext = createContext<createModalStore.Hook>(
	createModalStore({
		defaultOpen: false,
	}),
);
