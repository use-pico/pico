import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const HighlighterCls = contract(PicoCls.contract)
	.slots([
		"root",
		"hole",
	])
	.bool("center")
	.def()
	.root({
		root: {
			class: [
				"Highlighter-root",
				"fixed",
				"inset-0",
				"pointer-events-auto",
				"z-[10000]",
				"print:hidden",
			],
		},
		hole: {
			class: [
				"Highlighter-hole",
				"fixed",
				"shadow-[0_0_0_300vh_rgba(0,0,0,0.6)]",
				"transition-[top,left,width,height]",
				"duration-300",
				"ease-in-out",
			],
			token: [
				"round.default",
				"border.default",
				"tone.primary.light.border",
			],
		},
	})
	.match("center", true, {
		hole: {
			class: [
				"fixed",
				"left-1/2",
				"top-1/2",
				"-translate-x-1/2",
				"-translate-y-1/2",
				"w-0",
				"h-0",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		center: false,
	})
	.cls();

export type HighlighterCls = typeof HighlighterCls;

export namespace HighlighterCls {
	export type Props<P = unknown> = Cls.Props<HighlighterCls, P>;
}
