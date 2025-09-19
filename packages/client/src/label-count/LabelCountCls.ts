import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LabelCountCls = contract(PicoCls.contract)
	.slots([
		"root",
		"label",
	])
	.def()
	.root({
		root: {
			class: [
				"LabelCount-root",
				"flex",
				"flex-row",
				"items-center",
				"w-fit",
				"gap-2",
			],
		},
		label: {
			class: [
				"LabelCount-label",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type LabelCountCls = typeof LabelCountCls;

export namespace LabelCountCls {
	export type Props<P = unknown> = Cls.Props<LabelCountCls, P>;
}
