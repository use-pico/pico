import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const JustDropZoneCls = contract(PicoCls.contract)
	.slots([
		"root",
		"label",
		"zone",
	])
	.bool("active")
	.bool("rejected")
	.def()
	.root({
		root: {
			class: [
				"JustDropZone-root",
				"flex",
				"flex-col",
				"gap-2",
				"items-center",
				"justify-center",
				"w-full",
			],
			token: [
				"shadow.default",
			],
		},
		label: {
			class: [
				"JustDropZone-label",
				"flex",
				"flex-col",
				"items-center",
				"justify-center",
				"w-full",
				"h-64",
				"border-2",
				"border-dashed",
				"cursor-pointer",
			],
			token: [
				"round.default",
				"tone.neutral.light.border",
				"tone.neutral.light.text",
				"tone.neutral.light.text:hover",
				"tone.neutral.light.bg",
				"tone.neutral.light.bg:hover",
				"tone.neutral.light.shadow",
				"tone.neutral.light.shadow:hover",
			],
		},
		zone: {
			class: [
				"JustDropZone-zone",
				"flex",
				"flex-col",
				"items-center",
				"justify-center",
				"pt-5",
				"pb-6",
			],
			token: [
				"tone.neutral.light.text",
				"tone.neutral.light.text:hover",
			],
		},
	})
	.match("active", true, {
		label: {
			token: [
				"tone.primary.light.text",
			],
		},
		zone: {
			token: [
				"tone.primary.light.text",
			],
		},
	})
	.match("rejected", true, {
		label: {
			token: [
				"tone.danger.light.text",
				"tone.danger.light.text:hover",
			],
		},
		zone: {
			token: [
				"tone.danger.light.text",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		active: false,
		rejected: false,
	})
	.cls();

export type JustDropZoneCls = typeof JustDropZoneCls;

export namespace JustDropZoneCls {
	export type Props<P = unknown> = Cls.Props<JustDropZoneCls, P>;
}
