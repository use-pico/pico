import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const BoolInputCls = contract(PicoCls.contract)
	.slots([
		"root",
		"track",
		"thumb",
		"input",
		"container",
		"content",
		"label",
		"description",
		"textContainer",
	])
	.variant("size", [
		"sm",
		"md",
		"lg",
	])
	.bool("value")
	.bool("disabled")
	.def()
	.root({
		root: {
			class: [
				"BoolInput-root",
				"relative",
				"inline-flex",
				"items-center",
				"focus:outline-none",
				"focus:ring-3",
				"focus:ring-indigo-500/50",
				"focus:ring-offset-2",
			],
			token: [
				"round.full",
			],
		},
		track: {
			class: [
				"BoolInput-track",
				"relative",
				"inline-flex",
				"items-center",
				"justify-start",
				"transition-colors",
				"duration-200",
				"ease-in-out",
				"cursor-pointer",
				"bg-gray-200",
				"border-gray-300",
				"[container-type:size]",
			],
			token: [
				"border.default",
				"round.full",
			],
		},
		thumb: {
			class: [
				"BoolInput-thumb",
				"absolute",
				"bg-white",
				"shadow-sm",
				"border-gray-300",
				"transition-transform",
				"duration-200",
				"ease-in-out",
				"top-1/2",
				"-translate-y-1/2",
			],
			token: [
				"border.default",
				"round.full",
			],
		},
		input: {
			class: [
				"BoolInput-input",
				"sr-only",
			],
		},
		container: {
			class: [
				"BoolInput-container",
				"flex",
				"items-center",
				"justify-between",
			],
		},
		content: {
			class: [
				"BoolInput-content",
				"flex",
				"items-center",
				"gap-3",
			],
		},
		label: {
			class: [
				"BoolInput-label",
				"text-sm",
				"font-medium",
				"text-gray-900",
				"cursor-pointer",
			],
		},
		description: {
			class: [
				"BoolInput-description",
				"text-sm",
				"text-gray-500",
			],
		},
		textContainer: {
			class: [
				"BoolInput-textContainer",
				"flex",
				"flex-col",
				"gap-1",
			],
		},
	})
	// Size variants (shared styles regardless of value)
	.match("size", "sm", {
		track: {
			class: [
				"w-8",
				"h-4",
			],
		},
		thumb: {
			class: [
				"w-3",
				"h-3",
			],
		},
	})
	.match("size", "md", {
		track: {
			class: [
				"w-12",
				"h-6",
			],
		},
		thumb: {
			class: [
				"w-5",
				"h-5",
			],
		},
	})
	.match("size", "lg", {
		track: {
			class: [
				"w-14",
				"h-7",
			],
		},
		thumb: {
			class: [
				"w-6",
				"h-6",
			],
		},
	})
	// Value-specific positioning
	.match("value", true, {
		thumb: {
			class: [
				"transform",
				"translate-x-[calc(100cqw-100%)]",
			],
		},
	})
	// Tone variants with value states
	.rule(
		{
			tone: "primary",
			value: false,
		},
		{
			track: {
				token: [
					"tone.primary.light.bg",
					"tone.primary.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "primary",
			value: true,
		},
		{
			track: {
				token: [
					"tone.primary.dark.bg",
					"tone.primary.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "danger",
			value: false,
		},
		{
			track: {
				token: [
					"tone.danger.light.bg",
					"tone.danger.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "danger",
			value: true,
		},
		{
			track: {
				token: [
					"tone.danger.dark.bg",
					"tone.danger.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "warning",
			value: false,
		},
		{
			track: {
				token: [
					"tone.warning.light.bg",
					"tone.warning.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "warning",
			value: true,
		},
		{
			track: {
				token: [
					"tone.warning.dark.bg",
					"tone.warning.dark.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "neutral",
			value: false,
		},
		{
			track: {
				token: [
					"tone.neutral.light.bg",
					"tone.neutral.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "neutral",
			value: true,
		},
		{
			track: {
				token: [
					"tone.neutral.dark.bg",
					"tone.neutral.dark.border",
				],
			},
		},
	)
	// Secondary tone
	.rule(
		{
			tone: "secondary",
			value: false,
		},
		{
			track: {
				token: [
					"tone.secondary.light.bg",
					"tone.secondary.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "secondary",
			value: true,
		},
		{
			track: {
				token: [
					"tone.secondary.dark.bg",
					"tone.secondary.dark.border",
				],
			},
		},
	)
	// Subtle tone
	.rule(
		{
			tone: "subtle",
			value: false,
		},
		{
			track: {
				token: [
					"tone.subtle.light.bg",
					"tone.subtle.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "subtle",
			value: true,
		},
		{
			track: {
				token: [
					"tone.subtle.dark.bg",
					"tone.subtle.dark.border",
				],
			},
		},
	)
	// Link tone
	.rule(
		{
			tone: "link",
			value: false,
		},
		{
			track: {
				token: [
					"tone.link.light.bg",
					"tone.link.light.border",
				],
			},
		},
	)
	.rule(
		{
			tone: "link",
			value: true,
		},
		{
			track: {
				token: [
					"tone.link.dark.bg",
					"tone.link.dark.border",
				],
			},
		},
	)
	// Disabled variant rules
	.match("disabled", true, {
		root: {
			class: [
				"focus:ring-0",
				"focus:outline-none",
			],
		},
		track: {
			class: [
				"opacity-50",
				"cursor-not-allowed",
			],
		},
		thumb: {
			class: [
				"opacity-50",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		size: "md",
		value: false,
		disabled: false,
	})
	.cls();

export type BoolInputCls = typeof BoolInputCls;

export namespace BoolInputCls {
	export type Props<P = unknown> = Cls.Props<BoolInputCls, P>;
}
