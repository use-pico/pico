import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ButtonCls = PicoCls.extend(
	{
		tokens: {
			"button.size": [
				"xs",
				"sm",
				"md",
			],
		},
		slot: [
			"root",
		],
		variant: {
			tone: [
				"primary",
				"secondary",
				"danger",
				"neutral",
				"subtle",
			],
			light: [
				"bool",
			],
			disabled: [
				"bool",
			],
			size: [
				"xs",
				"sm",
				"md",
			],
			borderless: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({
			"button.size": {
				xs: [
					"px-1",
					"py-0.5",
					"text-xs",
				],
				sm: [
					"px-3",
					"py-2",
					"text-sm",
				],
				md: [
					"px-4",
					"py-2",
					"text-base",
				],
			},
		}),
		rules: [
			def.root({
				root: what.both(
					[
						"flex",
						"flex-row",
						"items-center",
						"justify-center",
						"gap-2",
						"group",
						"transition-all",
						"cursor-pointer",
						"border",
						"select-none",
						"active:scale-95",
						"active:opacity-90",
					],
					[
						"shadow.sm",
					],
				),
			}),
			/**
			 * Size rules
			 */
			def.rule(
				what.variant({
					size: "xs",
				}),
				{
					root: what.token([
						"button.size.xs",
						"round.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.token([
						"button.size.sm",
						"round.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.token([
						"button.size.md",
						"round.lg",
					]),
				},
			),
			/**
			 * Tone rules
			 */
			def.rule(
				what.variant({
					tone: "primary",
					light: false,
				}),
				{
					root: what.token([
						"primary.color.text-light",
						"primary.color.bg-dark",
						"primary.color.border-dark",
						"primary.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "primary",
					light: true,
				}),
				{
					root: what.token([
						"primary.color.text-dark",
						"primary.color.bg-light",
						"primary.color.border-light",
						"primary.color.shadow-light",
					]),
				},
			),
			// Secondary
			def.rule(
				what.variant({
					tone: "secondary",
					light: false,
				}),
				{
					root: what.token([
						"secondary.color.text-light",
						"secondary.color.bg-dark",
						"secondary.color.border-dark",
						"secondary.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					light: true,
				}),
				{
					root: what.token([
						"secondary.color.text-dark",
						"secondary.color.bg-light",
						"secondary.color.border-light",
						"secondary.color.shadow-light",
					]),
				},
			),
			// Danger
			def.rule(
				what.variant({
					tone: "danger",
					light: false,
				}),
				{
					root: what.token([
						"danger.color.text-light",
						"danger.color.bg-dark",
						"danger.color.border-dark",
						"danger.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					light: true,
				}),
				{
					root: what.token([
						"danger.color.text-dark",
						"danger.color.bg-light",
						"danger.color.border-light",
						"danger.color.shadow-light",
					]),
				},
			),
			// Neutral
			def.rule(
				what.variant({
					tone: "neutral",
					light: false,
				}),
				{
					root: what.token([
						"neutral.color.text-dark",
						"neutral.color.bg-dark",
						"neutral.color.border-dark",
						"neutral.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					light: true,
				}),
				{
					root: what.token([
						"neutral.color.text-dark",
						"neutral.color.bg-light",
						"neutral.color.border-light",
						"neutral.color.shadow-light",
					]),
				},
			),
			// Subtle
			def.rule(
				what.variant({
					tone: "subtle",
					light: false,
				}),
				{
					root: what.token([
						"subtle.color.text-dark",
						"subtle.color.bg-dark",
						"subtle.color.border-dark",
						"subtle.color.shadow-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					light: true,
				}),
				{
					root: what.token([
						"subtle.color.text-dark",
						"subtle.color.bg-light",
						"subtle.color.border-light",
						"subtle.color.shadow-light",
					]),
				},
			),
			// Disabled state (applies across tones and sizes)
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"opacity-60",
						"cursor-not-allowed",
						"pointer-events-none",
						"shadow-none",
					]),
				},
			),
			// Borderless state
			def.rule(
				what.variant({
					borderless: true,
				}),
				{
					root: what.css([
						"border-none",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			light: false,
			disabled: false,
			size: "md",
			borderless: false,
		}),
	}),
);

export namespace ButtonCls {
	export type Props<P = unknown> = Component<typeof ButtonCls, P>;
}
