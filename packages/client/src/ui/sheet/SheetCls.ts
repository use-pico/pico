import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const SheetCls = contract(PicoCls.contract)
	.slots([
		"root",
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
	.bool("disabled")
	.def()
	.root({
		root: {
			class: [
				"Sheet-root",
				"grid",
				"grid-cols-1",
				"content-center",
				"min-h-0",
				"min-w-0",
				"w-full",
				"h-full",
			],
			token: [
				"border.default",
				"shadow.default",
			],
		},
	})
	// Tone colors (dark / light)
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
	// Round variants
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
	// Disabled variant
	.match("disabled", true, {
		root: {
			class: [
				"opacity-80",
				"pointer-events-none",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		round: "unset",
		disabled: false,
	})
	.cls();

export type SheetCls = typeof SheetCls;

export namespace SheetCls {
	export type Props<P = unknown> = Cls.Props<SheetCls, P>;
}
