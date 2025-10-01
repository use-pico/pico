import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AlertCls = contract(PicoCls.contract)
	.slots([
		"root",
		"header",
		"title",
		"message",
		"body",
	])
	.bool("clickable")
	.def()
	.root({
		root: {
			class: [
				"Alert-root",
				"flex",
				"flex-col",
				"gap-2",
			],
			token: [
				"shadow.default",
				"round.default",
				"border.default",
				"padding.md",
			],
		},
		header: {
			class: [
				"Alert-header",
				"flex",
				"items-center",
				"gap-2",
				"w-full",
			],
		},
		title: {
			class: [
				"Alert-title",
				"font-semibold",
				"w-full",
			],
		},
		message: {
			class: [
				"Alert-message",
				"opacity-85",
				"text-sm",
				"w-full",
			],
		},
		body: {
			class: [
				"Alert-body",
				"border-t",
				"w-full",
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
			body: {
				token: [
					"tone.primary.dark.border",
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
			body: {
				token: [
					"tone.primary.light.border",
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
			body: {
				token: [
					"tone.secondary.dark.border",
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
			body: {
				token: [
					"tone.secondary.light.border",
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
			body: {
				token: [
					"tone.danger.dark.border",
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
			body: {
				token: [
					"tone.danger.light.border",
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
			body: {
				token: [
					"tone.warning.dark.border",
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
			body: {
				token: [
					"tone.warning.light.border",
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
			body: {
				token: [
					"tone.neutral.dark.border",
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
			body: {
				token: [
					"tone.neutral.light.border",
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
			body: {
				token: [
					"tone.subtle.dark.border",
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
			body: {
				token: [
					"tone.subtle.light.border",
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
			body: {
				token: [
					"tone.link.dark.border",
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
			body: {
				token: [
					"tone.link.light.border",
				],
			},
		},
	)
	// Clickable affordance
	.match("clickable", true, {
		root: {
			class: [
				"group",
				"cursor-pointer",
				"transition-all",
				"hover:shadow-md",
				"active:opacity-90",
			],
			token: [
				"scale.sm",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		clickable: false,
	})
	.cls();

export type AlertCls = typeof AlertCls;

export namespace AlertCls {
	export type Props<P = unknown> = Cls.Props<AlertCls, P>;
}
