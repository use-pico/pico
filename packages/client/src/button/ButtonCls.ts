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
					"px-2",
					"py-0.5",
					"text-xs",
				],
				sm: [
					"px-4",
					"py-2",
					"text-sm",
				],
				md: [
					"px-6",
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
						"hover:scale-105",
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
						"primary.color.text-light-hover",
						"primary.color.bg-dark",
						"primary.color.bg-dark-hover",
						"primary.color.border-dark",
						"primary.color.border-dark-hover",
						"primary.color.shadow-dark",
						"primary.color.shadow-dark-hover",
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
						"primary.color.text-dark-hover",
						"primary.color.bg-light",
						"primary.color.bg-light-hover",
						"primary.color.border-light",
						"primary.color.border-light-hover",
						"primary.color.shadow-light",
						"primary.color.shadow-light-hover",
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
						"secondary.color.text-light-hover",
						"secondary.color.bg-dark",
						"secondary.color.bg-dark-hover",
						"secondary.color.border-dark",
						"secondary.color.border-dark-hover",
						"secondary.color.shadow-dark",
						"secondary.color.shadow-dark-hover",
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
						"secondary.color.text-dark-hover",
						"secondary.color.bg-light",
						"secondary.color.bg-light-hover",
						"secondary.color.border-light",
						"secondary.color.border-light-hover",
						"secondary.color.shadow-light",
						"secondary.color.shadow-light-hover",
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
						"danger.color.text-light-hover",
						"danger.color.bg-dark",
						"danger.color.bg-dark-hover",
						"danger.color.border-dark",
						"danger.color.border-dark-hover",
						"danger.color.shadow-dark",
						"danger.color.shadow-dark-hover",
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
						"danger.color.text-dark-hover",
						"danger.color.bg-light",
						"danger.color.bg-light-hover",
						"danger.color.border-light",
						"danger.color.border-light-hover",
						"danger.color.shadow-light",
						"danger.color.shadow-light-hover",
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
						"neutral.color.text-dark-hover",
						"neutral.color.bg-dark",
						"neutral.color.bg-dark-hover",
						"neutral.color.border-dark",
						"neutral.color.border-dark-hover",
						"neutral.color.shadow-dark",
						"neutral.color.shadow-dark-hover",
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
						"neutral.color.text-dark-hover",
						"neutral.color.bg-light",
						"neutral.color.bg-light-hover",
						"neutral.color.border-light",
						"neutral.color.border-light-hover",
						"neutral.color.shadow-light",
						"neutral.color.shadow-light-hover",
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
						"subtle.color.text-dark-hover",
						"subtle.color.bg-dark",
						"subtle.color.bg-dark-hover",
						"subtle.color.border-dark",
						"subtle.color.border-dark-hover",
						"subtle.color.shadow-dark",
						"subtle.color.shadow-dark-hover",
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
						"subtle.color.text-dark-hover",
						"subtle.color.bg-light",
						"subtle.color.bg-light-hover",
						"subtle.color.border-light",
						"subtle.color.border-light-hover",
						"subtle.color.shadow-light",
						"subtle.color.shadow-light-hover",
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
