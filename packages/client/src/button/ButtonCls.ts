import { type Cls, contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ButtonCls = contract(PicoCls.contract)
	.slots([
		"wrapper",
		"root",
	])
	.bool("disabled")
	.bool("border")
	.bool("background")
	.variant("size", [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.variant("round", [
		"default",
		"sm",
		"md",
		"lg",
		"xl",
		"full",
	])
	.def()
	.root({
		wrapper: {
			class: [
				"Button-wrapper",
			],
		},
		root: {
			class: [
				"Button-root",
				"flex",
				"flex-row",
				"items-center",
				"justify-center",
				"gap-2",
				"group",
				"transition-all",
				"cursor-pointer",
				"select-none",
				"active:opacity-90",
			],
			token: [
				"scale.default",
				"border.default",
				"shadow.default",
			],
		},
	})
	/**
	 * Size rules
	 */
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
	/**
	 * Tone rules - only for actual tone/theme combinations (no "unset")
	 */
	.rule(
		{
			tone: "primary",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.primary.light.set",
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
					"tone.primary.dark.set",
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
					"tone.secondary.light.set",
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
					"tone.secondary.dark.set",
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
					"tone.danger.light.set",
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
					"tone.danger.dark.set",
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
					"tone.warning.light.set",
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
					"tone.warning.dark.set",
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
					"tone.neutral.light.set",
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
					"tone.neutral.dark.set",
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
					"tone.subtle.light.set",
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
					"tone.subtle.dark.set",
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
					"tone.link.light.set",
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
					"tone.link.dark.set",
				],
			},
		},
	)
	/**
	 * Disabled
	 */
	.match("disabled", true, {
		wrapper: {
			class: [
				"cursor-not-allowed",
			],
		},
		root: {
			token: [
				"disabled",
			],
		},
	})
	/**
	 * Border
	 */
	.match("border", false, {
		root: {
			class: [
				"border-none",
			],
		},
	})
	/**
	 * Background
	 */
	.match("background", false, {
		root: {
			class: [
				"bg-none",
				"bg-transparent",
				"shadow-none",
			],
		},
	})
	/**
	 * Round rules
	 */
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
	.defaults({
		tone: "primary",
		theme: "light",
		disabled: false,
		size: "md",
		border: true,
		background: true,
		round: "default",
	})
	.cls();

export type ButtonCls = typeof ButtonCls;

export namespace ButtonCls {
	export type Props<P = unknown> = Cls.Props<ButtonCls, P>;
}
