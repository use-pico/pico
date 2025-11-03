import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const ActionCls = contract(PicoCls.contract)
	.slots([
		"root",
		"wrapper",
	])
	.variant("tone", [
		"primary",
		"secondary",
		"danger",
		"warning",
		"neutral",
		"subtle",
	])
	.variant("theme", [
		"light",
		"dark",
	])
	.bool("disabled")
	.bool("loading")
	.def()
	.root({
		root: {
			class: [
				"Action-root",
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
				"px-4",
				"py-2",
				"text-lg",
				"cursor-pointer",
				"transition-all",
				"select-none",
				"border-transparent",
			],
			token: [
				"round.default",
				"scale.md",
				"border.default",
				"border.default:hover",
			],
		},
		wrapper: {
			class: [
				"Action-wrapper",
			],
		},
	})
	// Dark theme tone rules
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
					"tone.primary.dark.bg",
					"tone.primary.dark.bg:hover",
					"tone.primary.dark.border",
					"tone.primary.dark.border:hover",
					"tone.primary.dark.shadow",
					"tone.primary.dark.shadow:hover",
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
					"tone.secondary.dark.bg",
					"tone.secondary.dark.bg:hover",
					"tone.secondary.dark.border",
					"tone.secondary.dark.border:hover",
					"tone.secondary.dark.shadow",
					"tone.secondary.dark.shadow:hover",
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
					"tone.danger.dark.bg",
					"tone.danger.dark.bg:hover",
					"tone.danger.dark.border",
					"tone.danger.dark.border:hover",
					"tone.danger.dark.shadow",
					"tone.danger.dark.shadow:hover",
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
					"tone.warning.dark.bg",
					"tone.warning.dark.bg:hover",
					"tone.warning.dark.border",
					"tone.warning.dark.border:hover",
					"tone.warning.dark.shadow",
					"tone.warning.dark.shadow:hover",
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
					"tone.neutral.dark.bg",
					"tone.neutral.dark.bg:hover",
					"tone.neutral.dark.border",
					"tone.neutral.dark.border:hover",
					"tone.neutral.dark.shadow",
					"tone.neutral.dark.shadow:hover",
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
					"tone.subtle.dark.bg",
					"tone.subtle.dark.bg:hover",
					"tone.subtle.dark.border",
					"tone.subtle.dark.border:hover",
					"tone.subtle.dark.shadow",
					"tone.subtle.dark.shadow:hover",
				],
			},
		},
	)
	// Light theme tone rules
	.rule(
		{
			tone: "primary",
			theme: "light",
		},
		{
			root: {
				token: [
					"shadow.default",
					"tone.primary.light.text",
					"tone.primary.light.text:hover",
					"tone.primary.light.bg",
					"tone.primary.light.bg:hover",
					"tone.primary.light.border",
					"tone.primary.light.border:hover",
					"tone.primary.light.shadow",
					"tone.primary.light.shadow:hover",
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
					"shadow.default",
					"tone.secondary.light.text",
					"tone.secondary.light.text:hover",
					"tone.secondary.light.bg",
					"tone.secondary.light.bg:hover",
					"tone.secondary.light.border",
					"tone.secondary.light.border:hover",
					"tone.secondary.light.shadow",
					"tone.secondary.light.shadow:hover",
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
					"shadow.default",
					"tone.danger.light.text",
					"tone.danger.light.text:hover",
					"tone.danger.light.bg",
					"tone.danger.light.bg:hover",
					"tone.danger.light.border",
					"tone.danger.light.border:hover",
					"tone.danger.light.shadow",
					"tone.danger.light.shadow:hover",
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
					"shadow.default",
					"tone.warning.light.text",
					"tone.warning.light.text:hover",
					"tone.warning.light.bg",
					"tone.warning.light.bg:hover",
					"tone.warning.light.border",
					"tone.warning.light.border:hover",
					"tone.warning.light.shadow",
					"tone.warning.light.shadow:hover",
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
					"tone.neutral.light.shadow:hover",
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
					"shadow.default",
					"tone.subtle.light.text",
					"tone.subtle.light.text:hover",
					"tone.subtle.light.bg",
					"tone.subtle.light.bg:hover",
					"tone.subtle.light.border",
					"tone.subtle.light.border:hover",
					"tone.subtle.light.shadow",
					"tone.subtle.light.shadow:hover",
				],
			},
		},
	)
	.match("disabled", true, {
		wrapper: {
			class: [
				"cursor-not-allowed",
				"opacity-50",
			],
		},
		root: {
			class: [
				"pointer-events-none",
			],
		},
	})
	.match("loading", true, {
		wrapper: {
			class: [
				"cursor-progress",
				"opacity-50",
			],
		},
		root: {
			class: [
				"pointer-events-none",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		disabled: false,
		loading: false,
	})
	.cls();
