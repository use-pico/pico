import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const CardCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.bool("inline")
	.def()
	.root({
		root: {
			class: [
				"Card-root",
				"flex",
				"flex-col",
				"gap-4",
			],
			token: [
				"border.default",
				"round.default",
				"shadow.default",
				"square.lg",
				"tone.neutral.light.text",
				"tone.neutral.light.text:hover",
				"tone.neutral.light.border",
				"tone.neutral.light.border:hover",
				"tone.neutral.light.shadow",
				"tone.neutral.light.shadow:hover",
			],
		},
	})
	.match("inline", true, {
		root: {
			class: [
				"inline-flex",
				"flex-row",
				"gap-2",
			],
			token: [
				"square.md",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		inline: false,
	})
	.cls();

export type CardCls = typeof CardCls;

export namespace CardCls {
	export type Props<P = unknown> = Cls.Props<CardCls, P>;
}
