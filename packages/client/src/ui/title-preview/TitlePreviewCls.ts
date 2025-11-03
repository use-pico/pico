import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const TitlePreviewCls = contract(PicoCls.contract)
	.slots([
		"root",
		"title",
		"subtitle",
	])
	.bool("withSubtitle")
	.def()
	.root({
		root: {
			class: [
				"TitlePreview-root",
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
			],
			token: [
				"square.sm",
			],
		},
		title: {
			class: [
				"TitlePreview-title",
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
				"font-bold",
			],
			token: [
				"tone.neutral.light.text",
			],
		},
		subtitle: {
			class: [
				"TitlePreview-subtitle",
				"flex",
				"flex-row",
				"gap-4",
				"items-center",
			],
		},
	})
	.match("withSubtitle", true, {
		title: {
			class: [
				"border-r",
				"pr-2",
			],
			token: [
				"tone.neutral.light.border",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		withSubtitle: false,
	})
	.cls();

export type TitlePreviewCls = typeof TitlePreviewCls;

export namespace TitlePreviewCls {
	export type Props<P = unknown> = Cls.Props<TitlePreviewCls, P>;
}
