import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AppLayoutCls = contract(PicoCls.contract)
	.slots([
		"root",
		"header",
		"content",
	])
	.def()
	.root({
		root: {
			class: [
				"AppLayout-root",
				"min-h-screen",
				"flex",
				"flex-col",
			],
		},
		header: {
			class: [
				"AppLayout-header",
				"flex",
				"flex-row",
				"items-center",
				"shadow-xs",
				"border-b",
				"w-full",
				"gap-4",
				"p-4",
			],
			token: [
				"tone.neutral.light.bg",
				"tone.neutral.light.border",
			],
		},
		content: {
			class: [
				"AppLayout-content",
				"grow",
				"h-full",
				"border-b",
				"p-2",
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

export type AppLayoutCls = typeof AppLayoutCls;

export namespace AppLayoutCls {
	export type Props<P = unknown> = Cls.Props<AppLayoutCls, P>;
}
