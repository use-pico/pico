import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DeleteControlCls = contract(PicoCls.contract)
	.slots([
		"root",
		"content",
		"footer",
	])
	.def()
	.root({
		root: {
			class: [
				"DeleteControl-root",
				"flex",
				"flex-col",
				"gap-4",
			],
		},
		content: {
			class: [
				"DeleteControl-content",
				"text-bold",
				"font-bold",
			],
			token: [
				"tone.danger.light.text",
			],
		},
		footer: {
			class: [
				"DeleteControl-footer",
				"flex",
				"flex-row",
				"items-center",
				"justify-between",
				"gap-4",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type DeleteControlCls = typeof DeleteControlCls;

export namespace DeleteControlCls {
	export type Props<P = unknown> = Cls.Props<DeleteControlCls, P>;
}
