import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FulltextCls = contract(PicoCls.contract)
	.slots([
		"root",
		"search",
		"input",
		"clear",
		"submit",
	])
	.def()
	.root({
		root: {
			class: [
				"Fulltext-root",
				"relative",
				"w-full",
			],
		},
		search: {
			class: [
				"Fulltext-search",
				"absolute",
				"inset-y-0",
				"left-2",
				"flex",
				"items-center",
				"pointer-events-none",
			],
			token: [
				"tone.neutral.light.text",
				"tone.neutral.light.text:hover",
			],
		},
		input: {
			class: [
				"Fulltext-input",
				"px-10",
				"w-full",
			],
			token: [
				"border.default",
				"round.default",
				"size.md",
				"shadow.default",
				"tone.neutral.light.bg",
				"tone.neutral.light.bg:hover",
				"tone.neutral.light.bg",
				"tone.neutral.light.text",
				"tone.neutral.light.text:hover",
				"tone.neutral.light.border",
				"tone.neutral.light.border:hover",
				"tone.neutral.light.shadow",
				"tone.neutral.light.shadow:hover",
				"focus.off",
			],
		},
		clear: {
			class: [
				"Fulltext-clear",
				"absolute",
				"inset-y-0",
				"right-2",
				"flex",
				"items-center",
				"cursor-pointer",
			],
			token: [
				"tone.neutral.light.text",
				"tone.neutral.light.text:hover",
			],
		},
		submit: {
			class: [
				"Fulltext-submit",
				"absolute",
				"inset-y-0",
				"right-2",
				"flex",
				"items-center",
				"cursor-pointer",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type FulltextCls = typeof FulltextCls;

export namespace FulltextCls {
	export type Props<P = unknown> = Cls.Props<FulltextCls, P>;
}
