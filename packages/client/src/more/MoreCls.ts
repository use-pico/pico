import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MoreCls = contract(PicoCls.contract)
	.slots([
		"root",
		"item",
	])
	.def()
	.root({
		root: {
			class: [
				"More-root",
				"flex",
				"flex-row",
				"flex-wrap",
				"items-center",
				"gap-2",
				"text-sm",
				"font-semibold",
			],
		},
		item: {
			class: [
				"More-item",
				"px-2",
				"py-1",
			],
			token: [
				"border.default",
				"round.default",
				"tone.neutral.light.border",
				"tone.neutral.light.bg",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type MoreCls = typeof MoreCls;

export namespace MoreCls {
	export type Props<P = unknown> = Cls.Props<MoreCls, P>;
}
