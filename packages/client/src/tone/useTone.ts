import type { Cls } from "@use-pico/cls";
import type { PicoCls } from "../cls/PicoCls";
import { useToneContext } from "./useToneContext";

export namespace useTone {
	export interface Props {
		tone?: Cls.VariantOf<PicoCls, "tone">;
		theme?: Cls.VariantOf<PicoCls, "theme">;
	}
}

export const useTone = ({ tone, theme }: useTone.Props) => {
	const contextTone = useToneContext()((select) => select.tone);
	const contextTheme = useToneContext()((select) => select.theme);

	return {
		tone: tone ?? contextTone,
		theme: theme ?? contextTheme,
	};
};
