import type { Cls } from "@use-pico/cls";
import { create, type StoreApi, type UseBoundStore } from "zustand";
import type { PicoCls } from "../cls/PicoCls";

export namespace createToneStore {
	export type Tone = Cls.VariantOf<PicoCls, "tone">;
	export type Theme = Cls.VariantOf<PicoCls, "theme">;

	export interface Props {
		defaultTone?: Tone;
		defaultTheme?: Theme;
	}

	export interface Store {
		tone: Tone;
		theme: Theme;
		setTone(tone: Tone): void;
		setTheme(theme: Theme): void;
	}

	export type Hook = UseBoundStore<StoreApi<Store>>;
}

export const createToneStore = ({
	defaultTone = "unset",
	defaultTheme = "unset",
}: createToneStore.Props): createToneStore.Hook => {
	return create<createToneStore.Store>((set) => ({
		tone: defaultTone,
		theme: defaultTheme,
		setTone: (tone) => {
			set({
				tone,
			});
		},
		setTheme: (theme) => {
			set({
				theme,
			});
		},
	}));
};
