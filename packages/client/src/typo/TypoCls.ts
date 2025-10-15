import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TypoCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.variant("size", [
		"unset",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.variant("font", [
		"unset",
		"normal",
		"semi",
		"bold",
	])
	.variant("display", [
		"inline",
		"block",
	])
	.variant("wrap", [
		"wrap",
		"nowrap",
	])
	.bool("italic")
	.def()
	.root({
		root: {
			class: [
				"Typo-root",
			],
		},
	})
	.match("size", "xs", {
		root: {
			class: [
				"text-xs",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"text-sm",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"text-base",
			],
		},
	})
	.match("size", "lg", {
		root: {
			class: [
				"text-lg",
			],
		},
	})
	.match("size", "xl", {
		root: {
			class: [
				"text-xl",
			],
		},
	})
	.match("font", "normal", {
		root: {
			class: [
				"font-normal",
			],
		},
	})
	.match("font", "semi", {
		root: {
			class: [
				"font-semibold",
			],
		},
	})
	.match("font", "bold", {
		root: {
			class: [
				"font-bold",
			],
		},
	})
	// Tone rules with theme control
	.rule(
		{
			tone: "primary",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.primary.light.text",
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
				],
			},
		},
	)
	.match("italic", true, {
		root: {
			class: [
				"italic",
			],
		},
	})
	//
	.match("display", "block", {
		root: {
			class: [
				"block",
			],
		},
	})
	.match("display", "inline", {
		root: {
			class: [
				"inline",
			],
		},
	})
	//
	.match("wrap", "wrap", {
		root: {
			class: [
				"text-wrap",
			],
		},
	})
	.match("wrap", "nowrap", {
		root: {
			class: [
				"text-nowrap",
			],
		},
	})
	//
	.defaults({
		size: "unset",
		font: "unset",
		tone: "unset",
		theme: "unset",
		display: "inline",
		wrap: "wrap",
		italic: false,
	})
	.cls();

export type TypoCls = typeof TypoCls;

export namespace TypoCls {
	export type Props<P = unknown> = Cls.Props<TypoCls, P>;
}
