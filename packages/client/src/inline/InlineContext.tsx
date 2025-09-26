import { createContext } from "react";

export namespace InlineContext {
	export interface Context {
		inline: boolean;
	}
}

export const InlineContext = createContext<InlineContext.Context>({
	inline: false,
});
