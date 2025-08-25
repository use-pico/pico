import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BoolInputCls = PicoCls.extend(
	{
		tokens: [
			// Switch-specific tokens
			"switch.track",
			"switch.track:disabled",
			"switch.thumb",
			"switch.thumb:disabled",
			"switch.input",
			// Layout tokens
			"switch.container",
			"switch.content",
			"switch.label",
			"switch.description",
			"switch.textContainer",
		],
		slot: [
			"root",
			"track",
			"thumb",
			"input",
			"container",
			"content",
			"label",
			"description",
			"textContainer",
		],
		variant: {
			size: [
				"sm",
				"md",
				"lg",
			],
			tone: [
				"neutral",
				"primary",
				"danger",
				"warning",
			],
			value: [
				"bool",
			],
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({
			// Switch track styling
			"switch.track": what.both(
				[
					"relative",
					"inline-flex",
					"items-center",
					"transition-colors",
					"duration-200",
					"ease-in-out",
					"cursor-pointer",
					"bg-gray-200",
					"border-gray-300",
				],
				[
					"border.default",
					"round.full",
				],
			),

			"switch.track:disabled": what.css([
				"opacity-50",
				"cursor-not-allowed",
			]),
			// Switch thumb styling
			"switch.thumb": what.both(
				[
					"inline-block",
					"bg-white",
					"shadow-sm",
					"border-gray-300",
					"transition-transform",
					"duration-200",
					"ease-in-out",
				],
				[
					"border.default",
					"round.full",
				],
			),

			"switch.thumb:disabled": what.css([
				"opacity-50",
			]),
			// Hidden input
			"switch.input": what.css([
				"sr-only",
			]),
			// Layout styling
			"switch.container": what.css([
				"flex",
				"items-center",
				"justify-between",
			]),
			"switch.content": what.css([
				"flex",
				"items-center",
				"gap-3",
			]),
			"switch.label": what.css([
				"text-sm",
				"font-medium",
				"text-gray-900",
				"cursor-pointer",
			]),
			"switch.description": what.css([
				"text-sm",
				"text-gray-500",
			]),
			"switch.textContainer": what.css([
				"flex",
				"flex-col",
				"gap-1",
			]),
		}),
		rules: [
			def.root({
				root: what.both(
					[
						"relative",
						"inline-flex",
						"items-center",
						"focus:outline-none",
						"focus:ring-3",
						"focus:ring-indigo-500/50",
						"focus:ring-offset-2",
					],
					[
						"round.full",
					],
				),
				track: what.token([
					"switch.track",
				]),
				thumb: what.token([
					"switch.thumb",
				]),
				input: what.token([
					"switch.input",
				]),
				container: what.token([
					"switch.container",
				]),
				content: what.token([
					"switch.content",
				]),
				label: what.token([
					"switch.label",
				]),
				description: what.token([
					"switch.description",
				]),
				textContainer: what.token([
					"switch.textContainer",
				]),
			}),
			// Size variants
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					track: what.css([
						"w-8",
						"h-4",
					]),
					thumb: what.css([
						"w-3",
						"h-3",
						"ml-0.5",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					track: what.css([
						"w-11",
						"h-6",
					]),
					thumb: what.css([
						"w-5",
						"h-5",
						"ml-0.5",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					track: what.css([
						"w-14",
						"h-7",
					]),
					thumb: what.css([
						"w-6",
						"h-6",
						"ml-0.5",
					]),
				},
			),
			// Tone variants with value states
			def.rule(
				what.variant({
					tone: "primary",
					value: false,
				}),
				{
					track: what.token([
						"tone.primary.light.bg",
						"tone.primary.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "primary",
					value: true,
				}),
				{
					track: what.token([
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
					]),
					thumb: what.css([
						"transform",
						"translate-x-full",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					value: false,
				}),
				{
					track: what.token([
						"tone.danger.light.bg",
						"tone.danger.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					value: true,
				}),
				{
					track: what.token([
						"tone.danger.dark.bg",
						"tone.danger.dark.border",
					]),
					thumb: what.css([
						"transform",
						"translate-x-full",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					value: false,
				}),
				{
					track: what.token([
						"tone.warning.light.bg",
						"tone.warning.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					value: true,
				}),
				{
					track: what.token([
						"tone.warning.dark.bg",
						"tone.warning.dark.border",
					]),
					thumb: what.css([
						"transform",
						"translate-x-full",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					value: false,
				}),
				{
					track: what.token([
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					value: true,
				}),
				{
					track: what.token([
						"tone.neutral.dark.bg",
						"tone.neutral.dark.border",
					]),
					thumb: what.css([
						"transform",
						"translate-x-full",
					]),
				},
			),
			// Disabled variant rules
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"focus:ring-0",
						"focus:outline-none",
					]),
					track: what.token([
						"switch.track:disabled",
					]),
					thumb: what.token([
						"switch.thumb:disabled",
					]),
				},
			),
		],
		defaults: def.defaults({
			size: "md",
			tone: "primary",
			value: false,
			disabled: false,
		}),
	}),
);

export type BoolInputCls = typeof BoolInputCls;

export namespace BoolInputCls {
	export type Props<P = unknown> = Component<BoolInputCls, P>;
}
