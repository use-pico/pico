import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TransferCls = contract(PicoCls.contract)
	.slots([
		"root",
		"panel",
		"group",
		"header",
		"item",
	])
	.def()
	.root({
		root: {
			class: [
				"Transfer-root",
				"grid",
				"grid-cols-2",
				"gap-2",
				"select-none",
			],
		},
		panel: {
			class: [
				"Transfer-panel",
				"grow",
				"rounded",
				"p-4",
			],
			token: [
				"border.default",
				"tone.neutral.light.border",
			],
		},
		group: {
			class: [
				"Transfer-group",
				"transition-none",
			],
		},
		header: {
			class: [
				"Transfer-header",
				"font-bold",
			],
		},
		item: {
			class: [
				"Transfer-item",
				"flex",
				"flex-row",
				"items-center",
				"justify-between",
				"p-2",
				"rounded",
				"border-b",
				"border-transparent",
				"cursor-pointer",
				"group",
			],
			token: [
				"tone.neutral.light.border:hover",
				"tone.neutral.light.bg:hover",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type TransferCls = typeof TransferCls;

export namespace TransferCls {
	export type Props<P = unknown> = Cls.Props<TransferCls, P>;
}
