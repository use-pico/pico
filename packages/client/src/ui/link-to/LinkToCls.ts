import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const LinkToCls = contract(PicoCls.contract)
	.slot("root")
	.variant("display", [
		"unset",
		"block",
		"inline",
	])
	.variant("icon-position", [
		"left",
		"right",
	])
	.bool("full")
	.def()
	.root({
		root: {
			class: [
				"LinkTo-root",
				"flex",
				"flex-row",
				"flex-nowrap",
				"gap-2",
				"items-center",
				"justify-start",
				"focus:outline-hidden",
				"w-fit",
				"border-transparent",
				"transition-all",
			],
			token: [
				"round.default",
				"scale.default",
				"border.default",
			],
		},
	})
	//
	.match("icon-position", "left", {
		root: {
			class: [
				"flex",
				"flex-row",
				"flex-nowrap",
			],
		},
	})
	.match("icon-position", "right", {
		root: {
			class: [
				"flex",
				"flex-row",
				"flex-nowrap",
				"justify-between",
			],
		},
	})
	//
	.match("full", true, {
		root: {
			class: [
				"w-full",
				"block",
			],
		},
	})
	.rule(
		{
			full: true,
			"icon-position": "left",
		},
		{
			root: {
				class: [
					"flex",
					"flex-row",
					"flex-nowrap",
				],
			},
		},
	)
	.rule(
		{
			full: true,
			"icon-position": "right",
		},
		{
			root: {
				class: [
					"flex",
					"flex-row",
					"flex-nowrap",
					"justify-between",
				],
			},
		},
	)
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
	/**
	 * Tone rules
	 */
	.rule(
		{
			tone: "primary",
			theme: "dark",
		},
		{
			root: {
				token: [
					"tone.primary.dark.text",
					"tone.primary.dark.text:hover",
					"tone.primary.dark.bg:hover",
					"tone.primary.dark.border:hover",
				],
			},
		},
	)
	.rule(
		{
			tone: "primary",
			theme: "light",
		},
		{
			root: {
				token: [
					"tone.primary.light.text",
					"tone.primary.light.text:hover",
					"tone.primary.light.bg:hover",
					"tone.primary.light.border:hover",
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
					"tone.secondary.dark.text:hover",
					"tone.secondary.dark.bg:hover",
					"tone.secondary.dark.border:hover",
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
					"tone.secondary.light.text:hover",
					"tone.secondary.light.bg:hover",
					"tone.secondary.light.border:hover",
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
					"tone.danger.dark.text:hover",
					"tone.danger.dark.bg:hover",
					"tone.danger.dark.border:hover",
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
					"tone.danger.light.text:hover",
					"tone.danger.light.bg:hover",
					"tone.danger.light.border:hover",
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
					"tone.warning.dark.text:hover",
					"tone.warning.dark.bg:hover",
					"tone.warning.dark.border:hover",
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
					"tone.warning.light.text:hover",
					"tone.warning.light.bg:hover",
					"tone.warning.light.border:hover",
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
					"tone.neutral.dark.text:hover",
					"tone.neutral.dark.bg:hover",
					"tone.neutral.dark.border:hover",
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
					"tone.neutral.light.text:hover",
					"tone.neutral.light.bg:hover",
					"tone.neutral.light.border:hover",
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
					"tone.subtle.dark.text:hover",
					"tone.subtle.dark.bg:hover",
					"tone.subtle.dark.border:hover",
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
					"tone.subtle.light.text:hover",
					"tone.subtle.light.bg:hover",
					"tone.subtle.light.border:hover",
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
					"tone.link.dark.text:hover",
					"tone.link.dark.bg:hover",
					"tone.link.dark.border:hover",
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
					"tone.link.light.text:hover",
					"tone.link.light.bg:hover",
					"tone.link.light.border:hover",
				],
			},
		},
	)
	.defaults({
		tone: "link",
		theme: "light",
		display: "unset",
		full: false,
		"icon-position": "left",
	})
	.cls();

export type LinkToCls = typeof LinkToCls;

export namespace LinkToCls {
	export type Props<P = unknown> = Cls.Props<typeof LinkToCls, P>;
}
