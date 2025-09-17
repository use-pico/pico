import type { Cls } from "@use-pico/cls";
import { useContext } from "react";
import type { PicoCls } from "../cls/PicoCls";
import { createToneStore } from "./createToneStore";
import { ToneContext } from "./ToneContext";

export namespace useToneContext {
	export interface Props {
		/**
		 * Default tone if no context is found
		 */
		defaultTone?: Cls.VariantOf<PicoCls, "tone">;
		/**
		 * Default theme if no context is found
		 */
		defaultTheme?: Cls.VariantOf<PicoCls, "theme">;
	}
}

/**
 * Safe-to-call hook to connect tone to a context; if there is no context,
 * defaults you provide are returned.
 */
export const useToneContext = (
	{ defaultTone, defaultTheme }: useToneContext.Props = {
		defaultTheme: undefined,
		defaultTone: undefined,
	},
) => {
	const toneContext = useContext(ToneContext);

	if (!toneContext) {
		return createToneStore({
			defaultTone,
			defaultTheme,
		});
	}
	return toneContext;
};
