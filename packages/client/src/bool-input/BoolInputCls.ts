import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BoolInputCls = PicoCls.extend(
	{
		tokens: [],
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
			value: [
				"bool",
			],
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"BoolInput-root",
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
				track: what.both(
					[
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
					[
						"border.default",
						"round.full",
					],
				),
				thumb: what.both(
					[
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
					[
						"border.default",
						"round.full",
					],
				),
				input: what.css([
					"BoolInput-input",
					"sr-only",
				]),
				container: what.css([
					"BoolInput-container",
					"flex",
					"items-center",
					"justify-between",
				]),
				content: what.css([
					"BoolInput-content",
					"flex",
					"items-center",
					"gap-3",
				]),
				label: what.css([
					"BoolInput-label",
					"text-sm",
					"font-medium",
					"text-gray-900",
					"cursor-pointer",
				]),
				description: what.css([
					"BoolInput-description",
					"text-sm",
					"text-gray-500",
				]),
				textContainer: what.css([
					"BoolInput-textContainer",
					"flex",
					"flex-col",
					"gap-1",
				]),
			}),
			// Size variants (shared styles regardless of value)
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
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					track: what.css([
						"w-12",
						"h-6",
					]),
					thumb: what.css([
						"w-5",
						"h-5",
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
					]),
				},
			),
			// Value-specific positioning
			def.rule(
				what.variant({
					value: true,
				}),
				{
					thumb: what.css([
						"transform",
						"translate-x-[calc(100cqw-100%)]",
					]),
				},
			),
			// Tone variants with value states
			def.rule(
				what.variant({
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
					value: true,
				}),
				{
					track: what.token([
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
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
				},
			),
			// Secondary tone
			def.rule(
				what.variant({
					tone: "secondary",
					value: false,
				}),
				{
					track: what.token([
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					value: true,
				}),
				{
					track: what.token([
						"tone.secondary.dark.bg",
						"tone.secondary.dark.border",
					]),
				},
			),
			// Subtle tone
			def.rule(
				what.variant({
					tone: "subtle",
					value: false,
				}),
				{
					track: what.token([
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					value: true,
				}),
				{
					track: what.token([
						"tone.subtle.dark.bg",
						"tone.subtle.dark.border",
					]),
				},
			),
			// Link tone
			def.rule(
				what.variant({
					tone: "link",
					value: false,
				}),
				{
					track: what.token([
						"tone.link.light.bg",
						"tone.link.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "link",
					value: true,
				}),
				{
					track: what.token([
						"tone.link.dark.bg",
						"tone.link.dark.border",
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
					track: what.css([
						"opacity-50",
						"cursor-not-allowed",
					]),
					thumb: what.css([
						"opacity-50",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
			size: "md",
			value: false,
			disabled: false,
		}),
	}),
);

export type BoolInputCls = typeof BoolInputCls;

export namespace BoolInputCls {
	export type Props<P = unknown> = Cls.Props<BoolInputCls, P>;
}
