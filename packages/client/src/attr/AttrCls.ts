import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AttrCls = contract(PicoCls.contract)
	.slot("root")
	.bool("inline")
	.def()
	.root({
		root: {
			class: [
				"Attr-root",
				"transition-all",
			],
			token: [
				"padding.md",
				// "shadow.sm",
				// "border.default",
				// "tone.neutral.light.border",
				// "tone.neutral.light.shadow",
				// "tone.neutral.light.shadow:hover",
			],
		},
	})
	.switch(
		"inline",
		{
			root: {
				class: [
					"inline-flex",
					"gap-2",
					"items-center",
				],
			},
		},
		{
			root: {
				class: [
					"flex",
					"flex-col",
					"gap-2",
				],
			},
		},
	)
	.defaults({
		tone: "primary",
		theme: "light",
		inline: false,
	})
	.cls();

export type AttrCls = typeof AttrCls;

export namespace AttrCls {
	export type Props<P = unknown> = Cls.Props<AttrCls, P>;
}
