import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BadgeCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.bool("disabled")
	.bool("border")
	.variant("size", [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.variant("round", [
		"unset",
		"default",
		"sm",
		"md",
		"lg",
		"xl",
		"full",
	])
	.variant("snap-to", [
		"unset",
		"top-left",
		"top-right",
		"bottom-left",
		"bottom-right",
	])
	.def()
	.root({
		root: {
			class: [
				"Badge-root",
				"flex-row",
				"flex",
				"font-bold",
				"gap-2",
				"items-center",
				"justify-center",
				"select-none",
				"text-sm",
				"w-fit",
			],
			token: [
				"border.default",
				"shadow.default",
			],
		},
	})
	// Tone rules using tokens (dark background)
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
	// Tone rules using tokens (light background)
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
	.match("border", false, {
		root: {
			class: [
				"border-none",
			],
		},
	})
	// Disabled
	.match("disabled", true, {
		root: {
			class: [
				"opacity-60",
				"cursor-not-allowed",
				"pointer-events-none",
			],
		},
	})
	.match("size", "xs", {
		root: {
			token: [
				"size.xs",
			],
		},
	})
	.match("size", "sm", {
		root: {
			token: [
				"size.sm",
			],
		},
	})
	.match("size", "md", {
		root: {
			token: [
				"size.md",
			],
		},
	})
	.match("size", "lg", {
		root: {
			token: [
				"size.lg",
			],
		},
	})
	.match("size", "xl", {
		root: {
			token: [
				"size.xl",
			],
		},
	})
	.match("round", "default", {
		root: {
			token: [
				"round.default",
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
	.match("snap-to", "top-left", {
		root: {
			class: [
				"absolute",
				"top-2",
				"left-2",
			],
		},
	})
	.match("snap-to", "top-right", {
		root: {
			class: [
				"absolute",
				"top-2",
				"right-2",
			],
		},
	})
	.match("snap-to", "bottom-left", {
		root: {
			class: [
				"absolute",
				"bottom-2",
				"left-2",
			],
		},
	})
	.match("snap-to", "bottom-right", {
		root: {
			class: [
				"absolute",
				"bottom-2",
				"right-2",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		disabled: false,
		border: true,
		size: "md",
		round: "full",
		"snap-to": "unset",
	})
	.cls();

export type BadgeCls = typeof BadgeCls;

export namespace BadgeCls {
	export type Props<P = unknown> = Cls.Props<BadgeCls, P>;
}
