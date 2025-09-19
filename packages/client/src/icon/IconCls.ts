import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IconCls = contract(PicoCls.contract)
	.slot("root")
	.variant("size", [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.bool("disabled")
	.def()
	.root({
		root: {
			class: [
				"Icon-root",
			],
		},
	})
	// Size rules
	.match("size", "xs", {
		root: {
			token: [
				"inner-icon.xs",
			],
		},
	})
	.match("size", "sm", {
		root: {
			token: [
				"inner-icon.sm",
			],
		},
	})
	.match("size", "md", {
		root: {
			token: [
				"inner-icon.md",
			],
		},
	})
	.match("size", "lg", {
		root: {
			token: [
				"inner-icon.lg",
			],
		},
	})
	.match("size", "xl", {
		root: {
			token: [
				"inner-icon.xl",
			],
		},
	})
	// Tone rules (always include theme)
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
	// Disabled
	.match("disabled", true, {
		root: {
			class: [
				"pointer-events-none",
				"opacity-50",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		size: "md",
		disabled: false,
	})
	.cls();

export type IconCls = typeof IconCls;

export namespace IconCls {
	export type Props<P = unknown> = Cls.Props<IconCls, P>;
}
