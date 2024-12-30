import { createContext } from "react";

export const ModalContext = createContext<{
	close(): void;
}>({
	close() {
		//
	},
});
