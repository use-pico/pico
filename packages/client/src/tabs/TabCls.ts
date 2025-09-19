import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.bool("active")
	.def()
	.root({
		root: {
			class: [
				"Tab-root",
				"flex",
				"flex-row",
				"items-center",
				"gap-1",
				"cursor-pointer",
				"border-b-2",
				"border-transparent",
				"py-1",
				"px-2",
				"rounded",
			],
			token: [
				"border.default",
				"tone.neutral.light.text",
				"tone.neutral.light.border:hover",
			],
		},
	})
	.match("active", true, {
		root: {
			class: [
				"cursor-default",
				"font-semibold",
			],
			token: [
				"tone.neutral.light.text:hover",
				"tone.neutral.light.border",
				"tone.neutral.light.bg",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		active: false,
	})
	.cls();

export type TabCls = typeof TabCls;

export namespace TabCls {
	export type Props<P = unknown> = Cls.Props<TabCls, P>;
}
