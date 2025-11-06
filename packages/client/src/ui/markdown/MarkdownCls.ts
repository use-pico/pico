import { type Cls, contract } from "@use-pico/cls";
import { PicoCls } from "../../cls";

export const MarkdownCls = contract(PicoCls.contract)
	.slots([
		"h1",
		"h2",
		"a",
		"p",
		"strong",
		"em",
		"blockquote",
		"ul",
		"hr",
	])
	.def()
	.root({
		h1: {
			class: [
				"py-2",
			],
		},
		h2: {
			class: [
				"py-1",
			],
		},
		a: {
			token: [
				"tone.link.light.text",
			],
		},
		p: {
			class: [
				"py-2",
			],
		},
		blockquote: {
			class: [
				"pl-2",
				"my-2",
				"text-sm",
				"italic",
			],
			token: [
				"border.default",
				"round.lg",
				"shadow.default",
				"square.md",
				"tone.primary.dark.text",
				"tone.primary.dark.border",
				"tone.primary.dark.bg",
				"tone.primary.dark.shadow",
			],
		},
		ul: {
			class: [
				"list-disc",
				"my-2",
				"pl-4",
			],
		},
		hr: {
			class: [
				"w-full",
				"h-px",
				"my-4",
			],
			token: [
				"tone.primary.dark.bg",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type MarkdownCls = typeof MarkdownCls;

export namespace MarkdownCls {
	export type Props<P = unknown> = Cls.Props<MarkdownCls, P>;
}
