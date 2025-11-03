import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const PagesCls = contract(PicoCls.contract)
	.slots([
		"root",
		"list",
		"page",
	])
	.bool("current")
	.def()
	.root({
		root: {
			class: [
				"Pages-root",
				"select-none",
			],
		},
		list: {
			class: [
				"Pages-list",
				"inline-flex",
				"items-center",
				"gap-2",
			],
		},
		page: {
			class: [
				"Pages-page",
				"flex",
				"items-center",
				"justify-center",
				"cursor-pointer",
				"transition-all",
				"duration-200",
			],
			token: [
				"border.default",
				"shadow.default",
				"round.default",
				"size.sm",
				"tone.neutral.light.text",
				"tone.neutral.light.bg",
				"tone.neutral.light.bg:hover",
				"tone.neutral.light.border",
				"tone.neutral.light.border:hover",
				"tone.neutral.light.shadow:hover",
			],
		},
	})
	.match("current", true, {
		page: {
			class: [
				"font-bold",
			],
			token: [
				"shadow.sm",
				"size.md",
				"tone.neutral.light.text",
				"tone.neutral.light.bg",
				"tone.neutral.light.border",
				"tone.neutral.light.border:hover",
				"tone.neutral.light.shadow",
				"tone.neutral.light.shadow:hover",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		current: false,
	})
	.cls();
export type PagesCls = typeof PagesCls;

export namespace PagesCls {
	export type Props<P = unknown> = Cls.Props<PagesCls, P>;
}
