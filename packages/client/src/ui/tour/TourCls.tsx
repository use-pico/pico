import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const TourCls = contract(PicoCls.contract)
	.slots([
		"root",
		"nav",
		"hole",
	])
	.def()
	.root({
		root: {
			class: [
				"min-w-[215px]",
				"max-w-[285px]",
			],
			token: [
				"square.md",
				"shadow.default",
				"round.lg",
				"border.default",
				"tone.secondary.light.bg",
				"tone.secondary.light.text",
				"tone.secondary.light.border",
				"tone.secondary.light.shadow",
			],
		},
		nav: {
			class: [
				"inline-flex",
				"flex-row",
				"items-center",
				"justify-end",
				"gap-2",
			],
		},
		hole: {
			class: [
				"rounded-2xl",
				"ring-2",
				"ring-white/90",
				"shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type TourCls = typeof TourCls;

export namespace TourCls {
	export type Props<P = unknown> = Cls.Props<TourCls, P>;
}
