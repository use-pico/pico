import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ContentCls = contract(PicoCls.contract)
	.slots([
		"root",
		"tooltip",
	])
	.def()
	.root({
		root: {
			class: [
				"top-0",
				"left-0",
				"max-w-[100dvw]",
				"max-h-[100dvh]",
				"z-[10000]",
			],
		},
		tooltip: {
			class: [
				"overflow-auto",
			],
			token: [
				"round.lg",
				"border.default",
				"shadow.default",
				"square.md",
				"tone.secondary.light.text",
				"tone.secondary.light.bg",
				"tone.secondary.light.border",
				"tone.secondary.light.shadow",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type ContentCls = typeof ContentCls;

export namespace ContentCls {
	export type Props<P = unknown> = Cls.Props<ContentCls, P>;
}
