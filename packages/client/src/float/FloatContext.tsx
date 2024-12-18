import { createContext } from "react";

export namespace FloatContext {
	export interface Context {
		close(): void;
	}
}

export const FloatContext = createContext<FloatContext.Context>({
	close() {
		//
	},
});
