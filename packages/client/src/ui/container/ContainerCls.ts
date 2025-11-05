import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const ContainerCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.variant("height", [
		"unset",
		"fit",
		"content",
		"auto",
		"viewport",
	])
	.variant("width", [
		"unset",
		"fit",
		"auto",
		"viewport",
	])
	.variant("layout", [
		"unset",
		"horizontal",
		"horizontal-full",
		"vertical",
		"vertical-full",
		"vertical-header-content-footer",
		"vertical-header-content",
		"vertical-content-footer",
		"vertical-centered",
		"horizontal-flex",
		"vertical-flex",
	])
	.variant("scroll", [
		"unset",
		"horizontal",
		"vertical",
		"hidden",
	])
	.variant("snap", [
		"unset",
		"horizontal-start",
		"horizontal-center",
		"horizontal-end",
		"vertical-start",
		"vertical-center",
		"vertical-end",
	])
	.variant("lock", [
		"unset",
		"horizontal",
		"vertical",
	])
	.variant("square", [
		"unset",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.variant("gap", [
		"unset",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.variant("items", [
		"unset",
		"start",
		"center",
		"end",
		"stretch",
	])
	.variant("place-items", [
		"unset",
		"start",
		"center",
		"end",
		"stretch",
	])
	.variant("justify", [
		"unset",
		"start",
		"center",
		"end",
		"between",
		"around",
		"evenly",
	])
	.variant("position", [
		"unset",
		"absolute",
		"relative",
	])
	.variant("border", [
		"unset",
		"default",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.variant("round", [
		"unset",
		"default",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"full",
	])
	.variant("shadow", [
		"unset",
		"default",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.def()
	// Height
	.match("height", "fit", {
		root: {
			class: [
				"h-full",
				"min-h-0",
				"max-h-full",
			],
		},
	})
	.match("height", "auto", {
		root: {
			class: [
				"h-auto",
				"min-h-0",
			],
		},
	})
	.match("height", "content", {
		root: {
			class: [
				"h-fit",
				"min-h-0",
			],
		},
	})
	.match("height", "viewport", {
		root: {
			class: [
				"h-dvh",
				"min-h-dvh",
				"max-h-dvh",
			],
		},
	})
	// Width
	.match("width", "fit", {
		root: {
			class: [
				"w-full",
				"min-w-0",
				"max-w-full",
			],
		},
	})
	.match("width", "auto", {
		root: {
			class: [
				"w-auto",
				"min-w-0",
			],
		},
	})
	.match("width", "viewport", {
		root: {
			class: [
				"w-dvw",
				"min-w-dvw",
				"max-w-dvw",
			],
		},
	})
	// Layout
	.match("layout", "horizontal", {
		root: {
			class: [
				"grid",
				"grid-flow-col",
				"auto-cols-auto",
				"grid-rows-1",
			],
		},
	})
	.match("layout", "horizontal-full", {
		root: {
			class: [
				"grid",
				"grid-flow-col",
				"grid-rows-1",
				"auto-cols-[100%]",
				// Container needs full size for snap scrolling - width/height props should be "fit"
				"w-full",
				"h-full",
				"min-w-0",
				"min-h-0",
			],
		},
	})
	.match("layout", "vertical", {
		root: {
			class: [
				"grid",
				"grid-flow-row",
				"auto-rows-auto",
				"grid-cols-1",
			],
		},
	})
	.match("layout", "vertical-full", {
		root: {
			class: [
				"grid",
				"grid-flow-row",
				"grid-cols-1",
				"auto-rows-[100%]",
				// Container needs full size for snap scrolling - width/height props should be "fit"
				"w-full",
				"h-full",
				"min-w-0",
				"min-h-0",
			],
		},
	})
	.match("layout", "vertical-header-content-footer", {
		root: {
			class: [
				"grid",
				"grid-rows-[min-content_1fr_min-content]",
				"grid-cols-1",
			],
		},
	})
	.match("layout", "vertical-header-content", {
		root: {
			class: [
				"grid",
				"grid-rows-[min-content_1fr]",
				"grid-cols-1",
			],
		},
	})
	.match("layout", "vertical-content-footer", {
		root: {
			class: [
				"grid",
				"grid-rows-[1fr_min-content]",
				"grid-cols-1",
			],
		},
	})
	.match("layout", "vertical-centered", {
		root: {
			class: [
				"grid",
				"grid-rows-1",
				"justify-stretch",
			],
		},
	})
	.match("layout", "horizontal-flex", {
		root: {
			class: [
				"flex",
				"flex-row",
				"[&>*]:flex-shrink-0",
			],
		},
	})
	.match("layout", "vertical-flex", {
		root: {
			class: [
				"flex",
				"flex-col",
				"[&>*]:flex-shrink-0",
			],
		},
	})
	.rule(
		{
			layout: "vertical-centered",
			items: "unset",
		},
		{
			root: {
				class: [
					"place-items-center",
				],
			},
		},
	)
	// Scroll
	.match("scroll", "horizontal", {
		root: {
			class: [
				"isolate",
				"overflow-x-auto",
				"overflow-y-clip",
				"overscroll-contain",
				"[scrollbar-gutter:stable_both-edges]",
			],
		},
	})
	.match("scroll", "vertical", {
		root: {
			class: [
				"isolate",
				"overflow-y-auto",
				"overflow-x-clip",
				"overscroll-contain",
				"[scrollbar-gutter:stable_both-edges]",
			],
		},
	})
	.match("scroll", "hidden", {
		root: {
			class: [
				"overflow-hidden",
			],
		},
	})
	// Snap X axis (automatically includes scrolling)
	.match("snap", "horizontal-start", {
		root: {
			class: [
				"isolate",
				"overflow-x-auto",
				"overflow-y-clip",
				"overscroll-contain",
				"[scrollbar-gutter:stable_both-edges]",
				"snap-x",
				"snap-mandatory",
				"[&>*]:snap-start",
			],
		},
	})
	.match("snap", "horizontal-center", {
		root: {
			class: [
				"isolate",
				"overflow-x-auto",
				"overflow-y-clip",
				"overscroll-contain",
				"[scrollbar-gutter:stable_both-edges]",
				"snap-x",
				"snap-mandatory",
				"[&>*]:snap-center",
			],
		},
	})
	.match("snap", "horizontal-end", {
		root: {
			class: [
				"isolate",
				"overflow-x-auto",
				"overflow-y-clip",
				"overscroll-contain",
				"[scrollbar-gutter:stable_both-edges]",
				"snap-x",
				"snap-mandatory",
				"[&>*]:snap-end",
			],
		},
	})
	// Snap Y axis (automatically includes scrolling)
	.match("snap", "vertical-start", {
		root: {
			class: [
				"isolate",
				"overflow-y-auto",
				"overflow-x-clip",
				"overscroll-contain",
				"[scrollbar-gutter:stable_both-edges]",
				"snap-y",
				"snap-mandatory",
				"[&>*]:snap-start",
			],
		},
	})
	.match("snap", "vertical-center", {
		root: {
			class: [
				"isolate",
				"overflow-y-auto",
				"overflow-x-clip",
				"overscroll-contain",
				"[scrollbar-gutter:stable_both-edges]",
				"snap-y",
				"snap-mandatory",
				"[&>*]:snap-center",
			],
		},
	})
	.match("snap", "vertical-end", {
		root: {
			class: [
				"isolate",
				"overflow-y-auto",
				"overflow-x-clip",
				"overscroll-contain",
				"[scrollbar-gutter:stable_both-edges]",
				"snap-y",
				"snap-mandatory",
				"[&>*]:snap-end",
			],
		},
	})
	// Lock
	.match("lock", "horizontal", {
		root: {
			class: [
				"touch-pan-y",
				"[&_*]:touch-pan-y",
			],
		},
	})
	.match("lock", "vertical", {
		root: {
			class: [
				"touch-pan-x",
				"[&_*]:touch-pan-x",
			],
		},
	})
	// Square paddings via tokens
	.match("square", "xs", {
		root: {
			token: [
				"square.xs",
			],
		},
	})
	.match("square", "sm", {
		root: {
			token: [
				"square.sm",
			],
		},
	})
	.match("square", "md", {
		root: {
			token: [
				"square.md",
			],
		},
	})
	.match("square", "lg", {
		root: {
			token: [
				"square.lg",
			],
		},
	})
	.match("square", "xl", {
		root: {
			token: [
				"square.xl",
			],
		},
	})
	// Gaps
	.match("gap", "xs", {
		root: {
			class: [
				"gap-1",
			],
		},
	})
	.match("gap", "sm", {
		root: {
			class: [
				"gap-2",
			],
		},
	})
	.match("gap", "md", {
		root: {
			class: [
				"gap-3",
			],
		},
	})
	.match("gap", "lg", {
		root: {
			class: [
				"gap-4",
			],
		},
	})
	.match("gap", "xl", {
		root: {
			class: [
				"gap-5",
			],
		},
	})
	// Items placement (align-items for flex layouts)
	.match("items", "start", {
		root: {
			class: [
				"items-start",
			],
		},
	})
	.match("items", "center", {
		root: {
			class: [
				"items-center",
			],
		},
	})
	.match("items", "end", {
		root: {
			class: [
				"items-end",
			],
		},
	})
	.match("items", "stretch", {
		root: {
			class: [
				"items-stretch",
			],
		},
	})
	.rule(
		{
			items: "center",
			height: "auto",
		},
		{
			root: {
				class: [
					"self-center",
				],
			},
		},
	)
	// Place items (place-items for grid layouts)
	.match("place-items", "start", {
		root: {
			class: [
				"place-items-start",
			],
		},
	})
	.match("place-items", "center", {
		root: {
			class: [
				"place-items-center",
			],
		},
	})
	.rule(
		{
			layout: "vertical-centered",
			"place-items": "unset",
		},
		{
			root: {
				class: [
					"place-items-center",
				],
			},
		},
	)
	.match("place-items", "end", {
		root: {
			class: [
				"place-items-end",
			],
		},
	})
	.match("place-items", "stretch", {
		root: {
			class: [
				"place-items-stretch",
			],
		},
	})
	.rule(
		{
			layout: "vertical-centered",
			"place-items": "stretch",
		},
		{
			root: {
				class: [
					"place-items-[initial]",
					"justify-items-stretch",
					"items-center",
				],
			},
		},
	)
	// Justify content (for flex layouts, but not destructive if used elsewhere)
	.match("justify", "start", {
		root: {
			class: [
				"justify-start",
			],
		},
	})
	.match("justify", "center", {
		root: {
			class: [
				"justify-center",
			],
		},
	})
	.match("justify", "end", {
		root: {
			class: [
				"justify-end",
			],
		},
	})
	.match("justify", "between", {
		root: {
			class: [
				"justify-between",
			],
		},
	})
	.match("justify", "around", {
		root: {
			class: [
				"justify-around",
			],
		},
	})
	.match("justify", "evenly", {
		root: {
			class: [
				"justify-evenly",
			],
		},
	})
	// Position
	.match("position", "absolute", {
		root: {
			class: [
				"absolute",
			],
		},
	})
	.match("position", "relative", {
		root: {
			class: [
				"relative",
			],
		},
	})
	// Tone + Theme color tokens
	.rule(
		{
			tone: "primary",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.primary.light.text",
					"tone.primary.light.bg",
					"tone.primary.light.border",
					"tone.primary.light.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "primary",
			theme: "dark",
		},
		{
			root: {
				token: [
					"tone.primary.dark.text",
					"tone.primary.dark.bg",
					"tone.primary.dark.border",
					"tone.primary.dark.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "secondary",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.secondary.light.text",
					"tone.secondary.light.bg",
					"tone.secondary.light.border",
					"tone.secondary.light.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "secondary",
			theme: "dark",
		},
		{
			root: {
				token: [
					"tone.secondary.dark.text",
					"tone.secondary.dark.bg",
					"tone.secondary.dark.border",
					"tone.secondary.dark.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "danger",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.danger.light.text",
					"tone.danger.light.bg",
					"tone.danger.light.border",
					"tone.danger.light.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "danger",
			theme: "dark",
		},
		{
			root: {
				token: [
					"tone.danger.dark.text",
					"tone.danger.dark.bg",
					"tone.danger.dark.border",
					"tone.danger.dark.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "warning",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.warning.light.text",
					"tone.warning.light.bg",
					"tone.warning.light.border",
					"tone.warning.light.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "warning",
			theme: "dark",
		},
		{
			root: {
				token: [
					"tone.warning.dark.text",
					"tone.warning.dark.bg",
					"tone.warning.dark.border",
					"tone.warning.dark.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "neutral",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.neutral.light.text",
					"tone.neutral.light.bg",
					"tone.neutral.light.border",
					"tone.neutral.light.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "neutral",
			theme: "dark",
		},
		{
			root: {
				token: [
					"tone.neutral.dark.text",
					"tone.neutral.dark.bg",
					"tone.neutral.dark.border",
					"tone.neutral.dark.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "subtle",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.subtle.light.text",
					"tone.subtle.light.bg",
					"tone.subtle.light.border",
					"tone.subtle.light.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "subtle",
			theme: "dark",
		},
		{
			root: {
				token: [
					"tone.subtle.dark.text",
					"tone.subtle.dark.bg",
					"tone.subtle.dark.border",
					"tone.subtle.dark.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "link",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.link.light.text",
					"tone.link.light.bg",
					"tone.link.light.border",
					"tone.link.light.shadow",
				],
			},
		},
	)
	.rule(
		{
			tone: "link",
			theme: "dark",
		},
		{
			root: {
				token: [
					"tone.link.dark.text",
					"tone.link.dark.bg",
					"tone.link.dark.border",
					"tone.link.dark.shadow",
				],
			},
		},
	)
	// Border sizes
	.match("border", "default", {
		root: {
			token: [
				"border.default",
			],
		},
	})
	.match("border", "sm", {
		root: {
			token: [
				"border.sm",
			],
		},
	})
	.match("border", "md", {
		root: {
			token: [
				"border.md",
			],
		},
	})
	.match("border", "lg", {
		root: {
			token: [
				"border.lg",
			],
		},
	})
	.match("border", "xl", {
		root: {
			token: [
				"border.xl",
			],
		},
	})
	// Shadow sizes
	.match("shadow", "default", {
		root: {
			token: [
				"shadow.default",
			],
		},
	})
	.match("shadow", "sm", {
		root: {
			token: [
				"shadow.sm",
			],
		},
	})
	.match("shadow", "md", {
		root: {
			token: [
				"shadow.md",
			],
		},
	})
	.match("shadow", "lg", {
		root: {
			token: [
				"shadow.lg",
			],
		},
	})
	.match("shadow", "xl", {
		root: {
			token: [
				"shadow.xl",
			],
		},
	})
	// Round sizes
	.match("round", "default", {
		root: {
			token: [
				"round.default",
			],
		},
	})
	.match("round", "xs", {
		root: {
			token: [
				"round.sm",
			],
		},
	})
	.match("round", "sm", {
		root: {
			token: [
				"round.sm",
			],
		},
	})
	.match("round", "md", {
		root: {
			token: [
				"round.md",
			],
		},
	})
	.match("round", "lg", {
		root: {
			token: [
				"round.lg",
			],
		},
	})
	.match("round", "xl", {
		root: {
			token: [
				"round.xl",
			],
		},
	})
	.match("round", "full", {
		root: {
			token: [
				"round.full",
			],
		},
	})
	.defaults({
		tone: "unset",
		theme: "unset",
		height: "fit",
		width: "fit",
		layout: "unset",
		scroll: "unset",
		snap: "unset",
		lock: "unset",
		square: "unset",
		gap: "unset",
		items: "unset",
		"place-items": "unset",
		justify: "unset",
		position: "unset",
		border: "unset",
		round: "unset",
		shadow: "unset",
	})
	.cls();

export type ContainerCls = typeof ContainerCls;

export namespace ContainerCls {
	export type Props<P = unknown> = Cls.Props<ContainerCls, P>;
}
