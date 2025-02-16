import { createContext } from "react";
import { createModalStore } from "./createModalStore";

export const ModalContext = createContext<createModalStore.Store>(
	createModalStore({ defaultOpen: false }),
);
