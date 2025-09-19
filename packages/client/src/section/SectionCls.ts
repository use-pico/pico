import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const SectionCls = contract(PicoCls.contract)
	.slots([
		"root",
		"title",
		"items",
	])
	.def()
	.root({
		root: {
			class: [
				"Section-root",
				"flex-1",
			],
			token: [
				"square.md",
			],
		},
		title: {
			class: [
				"Section-title",
				"border-b-2",
			],
			token: [
				"round.default",
				"tone.neutral.light.border",
			],
		},
		items: {
			class: [
				"Section-items",
				"flex",
				"flex-col",
				"gap-2",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type SectionCls = typeof SectionCls;

export namespace SectionCls {
	export type Props<P = unknown> = Cls.Props<SectionCls, P>;
}
