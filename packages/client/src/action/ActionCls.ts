import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ActionCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.bool("disabled")
	.bool("loading")
	.bool("border")
	.variant("size", [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.def()
	.root({
		root: {
			class: [
				"Action-root",
				"flex",
				"items-center",
				"justify-center",
				"gap-2",
				"group",
				"transition-all",
				"cursor-pointer",
				"select-none",
			],
			token: [
				"scale.default",
				"round.default",
				"shadow.default",
				"border.default",
			],
		},
	})
	// Size rules
	.match("size", "xs", {
		root: {
			token: [
				"icon.xs",
			],
		},
	})
	.match("size", "sm", {
		root: {
			token: [
				"icon.sm",
			],
		},
	})
	.match("size", "md", {
		root: {
			token: [
				"icon.md",
			],
		},
	})
	.match("size", "lg", {
		root: {
			token: [
				"icon.lg",
			],
		},
	})
	.match("size", "xl", {
		root: {
			token: [
				"icon.xl",
			],
		},
	})
	// Tone rules (dark)
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
	// Tone rules (light)
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
	// Disabled / Loading / Border
	.match("disabled", true, {
		root: {
			token: [
				"disabled",
			],
		},
	})
	.match("loading", true, {
		root: {
			token: [
				"disabled",
			],
		},
	})
	.match("border", false, {
		root: {
			class: [
				"border-none",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		disabled: false,
		loading: false,
		border: true,
		size: "md",
	})
	.cls();

export type ActionCls = typeof ActionCls;

export namespace ActionCls {
	export type Props<P = unknown> = Cls.PropsTweaks<ActionCls, P>;
}
