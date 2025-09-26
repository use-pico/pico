import { PicoCls } from "@use-pico/client";
import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";

export const ContainerCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.variant("height", [
		"full",
		"dvh",
		"auto",
	])
	.variant("width", [
		"full",
		"dvw",
		"auto",
	])
	.variant("layout", [
		"unset",
		"vertical",
		"vertical-header-content-footer",
		"vertical-full",
		"horizontal",
		"horizontal-full",
	])
	.variant("overflow", [
		"unset",
		"horizontal",
		"vertical",
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
	.variant("item", [
		"unset",
		"col",
		"row",
		"full",
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
	.match("height", "full", {
		root: {
			class: [
				"Container-root-height[full]",
				"h-full",
				"min-h-0",
				"max-h-full",
			],
		},
	})
	.match("height", "dvh", {
		root: {
			class: [
				"Container-root-height[dvh]",
				"h-dvh",
				"min-h-dvh",
				"w-full",
			],
		},
	})
	.match("height", "auto", {
		root: {
			class: [
				"Container-root-height[auto]",
				"h-auto",
				"min-h-0",
				"w-full",
			],
		},
	})
	// Width
	.match("width", "full", {
		root: {
			class: [
				"Container-root-width[full]",
				"w-full",
				"min-w-0",
				"max-w-full",
			],
		},
	})
	.match("width", "dvw", {
		root: {
			class: [
				"Container-root-width[dvw]",
				"w-dvw",
				"min-w-dvw",
			],
		},
	})
	.match("width", "auto", {
		root: {
			class: [
				"Container-root-width[auto]",
				"w-auto",
				"min-w-0",
				"h-full",
			],
		},
	})
	// Layout
	.match("layout", "horizontal", {
		root: {
			class: [
				"Container-root-orientation[horizontal]",
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
				"Container-root-orientation[horizontal-full]",
				"grid",
				"grid-flow-col",
				"grid-rows-1",
				"auto-cols-[100%]",
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
				"Container-root-orientation[vertical]",
				"grid",
				"grid-flow-row",
				"auto-rows-auto",
				"grid-cols-1",
			],
		},
	})
	.match("layout", "vertical-header-content-footer", {
		root: {
			class: [
				"Container-root-orientation[vertical-header-content-footer]",
				"grid",
				"grid-rows-[min-content_1fr_min-content]",
				"grid-cols-1",
			],
		},
	})
	.match("layout", "vertical-full", {
		root: {
			class: [
				"Container-root-orientation[vertical-full]",
				"grid",
				"grid-flow-row",
				"grid-cols-1",
				"auto-rows-[100%]",
				"w-full",
				"h-full",
				"min-w-0",
				"min-h-0",
			],
		},
	})
	// Overflow
	.match("overflow", "horizontal", {
		root: {
			class: [
				"Container-root-overflow[horizontal]",
				"isolate",
				"overflow-x-auto",
				"overflow-y-clip",
				"[scrollbar-gutter:stable_both-edges]",
			],
		},
	})
	.match("overflow", "vertical", {
		root: {
			class: [
				"Container-root-overflow[vertical]",
				"isolate",
				"overflow-y-auto",
				"overflow-x-clip",
				"[scrollbar-gutter:stable_both-edges]",
			],
		},
	})
	// Snap X axis
	.match("snap", "horizontal-start", {
		root: {
			class: [
				"Container-root-snap[horizontal-start]",
				"isolate",
				"overflow-x-auto",
				"overflow-y-clip",
				"snap-x",
				"snap-mandatory",
				"[&>*]:snap-start",
			],
		},
	})
	.match("snap", "horizontal-center", {
		root: {
			class: [
				"Container-root-snap[horizontal-center]",
				"isolate",
				"overflow-x-auto",
				"overflow-y-clip",
				"snap-x",
				"snap-mandatory",
				"[&>*]:snap-center",
			],
		},
	})
	.match("snap", "horizontal-end", {
		root: {
			class: [
				"Container-root-snap[horizontal-end]",
				"isolate",
				"overflow-x-auto",
				"overflow-y-clip",
				"snap-x",
				"snap-mandatory",
				"[&>*]:snap-end",
			],
		},
	})
	// Snap Y axis
	.match("snap", "vertical-start", {
		root: {
			class: [
				"Container-root-snap[vertical-start]",
				"isolate",
				"overflow-y-auto",
				"overflow-x-clip",
				"snap-y",
				"snap-mandatory",
				"[&>*]:snap-start",
			],
		},
	})
	.match("snap", "vertical-center", {
		root: {
			class: [
				"Container-root-snap[vertical-center]",
				"isolate",
				"overflow-y-auto",
				"overflow-x-clip",
				"snap-y",
				"snap-mandatory",
				"[&>*]:snap-center",
			],
		},
	})
	.match("snap", "vertical-end", {
		root: {
			class: [
				"Container-root-snap[vertical-end]",
				"isolate",
				"overflow-y-auto",
				"overflow-x-clip",
				"snap-y",
				"snap-mandatory",
				"[&>*]:snap-end",
			],
		},
	})
	// Item helpers
	.match("item", "col", {
		root: {
			class: [
				"Container-root-item[col]",
				"h-full",
				"w-auto",
				"min-w-0",
				"min-h-0",
			],
		},
	})
	.match("item", "row", {
		root: {
			class: [
				"Container-root-item[row]",
				"w-full",
				"h-auto",
				"min-h-0",
				"min-w-0",
			],
		},
	})
	.match("item", "full", {
		root: {
			class: [
				"Container-root-item[full]",
				"w-full",
				"h-full",
				"min-w-0",
				"min-h-0",
			],
		},
	})
	// Square paddings via tokens
	.match("square", "xs", {
		root: {
			class: [
				"Container-root-square[xs]",
			],
			token: [
				"square.xs",
			],
		},
	})
	.match("square", "sm", {
		root: {
			class: [
				"Container-root-square[sm]",
			],
			token: [
				"square.sm",
			],
		},
	})
	.match("square", "md", {
		root: {
			class: [
				"Container-root-square[md]",
			],
			token: [
				"square.md",
			],
		},
	})
	.match("square", "lg", {
		root: {
			class: [
				"Container-root-square[lg]",
			],
			token: [
				"square.lg",
			],
		},
	})
	.match("square", "xl", {
		root: {
			class: [
				"Container-root-square[xl]",
			],
			token: [
				"square.xl",
			],
		},
	})
	// Gaps
	.match("gap", "xs", {
		root: {
			class: [
				"Container-root-gap[xs]",
				"gap-1",
			],
		},
	})
	.match("gap", "sm", {
		root: {
			class: [
				"Container-root-gap[sm]",
				"gap-2",
			],
		},
	})
	.match("gap", "md", {
		root: {
			class: [
				"Container-root-gap[md]",
				"gap-3",
			],
		},
	})
	.match("gap", "lg", {
		root: {
			class: [
				"Container-root-gap[lg]",
				"gap-4",
			],
		},
	})
	.match("gap", "xl", {
		root: {
			class: [
				"Container-root-gap[xl]",
				"gap-5",
			],
		},
	})
	// Position
	.match("position", "absolute", {
		root: {
			class: [
				"Container-root-position[absolute]",
				"absolute",
			],
		},
	})
	.match("position", "relative", {
		root: {
			class: [
				"Container-root-position[relative]",
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
		height: "full",
		width: "full",
		layout: "unset",
		overflow: "unset",
		snap: "unset",
		item: "unset",
		square: "unset",
		gap: "unset",
		position: "unset",
		border: "unset",
		round: "unset",
		shadow: "unset",
	})
	.cls();

export type ContainerCls = typeof ContainerCls;

export namespace ContainerCls {
	export type Props<P = unknown> = Cls.PropsTweaks<ContainerCls, P>;
}
