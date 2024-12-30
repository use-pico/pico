import { createContext } from "react";

export namespace ModalContext {
	export interface Instance {
		close(): void;
	}
}

export const ModalContext = createContext<ModalContext.Instance | undefined>(
	undefined,
);
