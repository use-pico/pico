import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PreviewCls = contract(PicoCls.contract)
	.slots([
		"root",
		"container",
		"title",
		"links",
		"actions",
		"extra",
		"divider",
	])
	.def()
	.root({
		root: {
			class: [
				"Preview-root",
				"flex",
				"flex-col",
				"gap-2",
				"p-2",
			],
			token: [
				"border.default",
				"tone.neutral.light.bg",
				"tone.neutral.light.border",
				"round.md",
			],
		},
		container: {
			class: [
				"Preview-container",
				"flex",
				"flex-row",
				"items-center",
				"justify-between",
				"gap-1",
			],
		},
		title: {
			class: [
				"Preview-title",
				"flex",
				"flex-row",
				"items-center",
				"gap-4",
			],
		},
		links: {
			class: [
				"Preview-links",
				"flex",
				"flex-row",
				"items-center",
				"gap-4",
				"justify-end",
			],
		},
		actions: {
			class: [
				"Preview-actions",
				"flex",
				"flex-row",
				"items-center",
				"gap-4",
			],
		},
		extra: {
			class: [
				"Preview-extra",
				"flex",
				"flex-row",
				"gap-4",
				"justify-end",
			],
		},
		divider: {
			class: [
				"Preview-divider",
				"w-full",
				"border-b",
			],
			token: [
				"tone.neutral.light.border",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type PreviewCls = typeof PreviewCls;

export namespace PreviewCls {
	export type Props<P = unknown> = Cls.Props<PreviewCls, P>;
}
