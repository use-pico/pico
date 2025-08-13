import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BadgeCls = PicoCls.extend(
	{
		tokens: [],
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
			theme: [
				"light",
				"dark",
			],
			disabled: [
				"bool",
			],
			borderless: [
				"bool",
			],
			size: [
				"xs",
				"sm",
				"md",
				"lg",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"border",
					"flex-row",
					"flex",
					"font-bold",
					"gap-2",
					"items-center",
					"rounded-full",
					"select-none",
					"text-sm",
				]),
			}),
			// Tone rules using tokens (dark background)
			def.rule(
				what.variant({
					tone: "primary",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.primary.dark.text",
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
						"tone.primary.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.secondary.dark.text",
						"tone.secondary.dark.bg",
						"tone.secondary.dark.border",
						"tone.secondary.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.danger.dark.text",
						"tone.danger.dark.bg",
						"tone.danger.dark.border",
						"tone.danger.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.neutral.dark.text",
						"tone.neutral.dark.bg",
						"tone.neutral.dark.border",
						"tone.neutral.dark.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.subtle.dark.text",
						"tone.subtle.dark.bg",
						"tone.subtle.dark.border",
						"tone.subtle.dark.shadow",
					]),
				},
			),

			// Tone rules using tokens (light background)
			def.rule(
				what.variant({
					tone: "primary",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.primary.light.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
						"tone.primary.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.secondary.light.text",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
						"tone.secondary.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.danger.light.text",
						"tone.danger.light.bg",
						"tone.danger.light.border",
						"tone.danger.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.neutral.light.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
						"tone.neutral.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.subtle.light.text",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
						"tone.subtle.light.shadow",
					]),
				},
			),
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
			// Disabled
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"opacity-60",
						"cursor-not-allowed",
						"pointer-events-none",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xs",
				}),
				{
					root: what.both(
						[
							"text-xs",
							"px-2",
							"py-0.5",
						],
						[
							"shadow.sm",
						],
					),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.both(
						[
							"text-sm",
							"px-3",
							"py-1",
						],
						[
							"shadow.sm",
						],
					),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.both(
						[
							"text-md",
							"px-4",
							"py-1.5",
						],
						[
							"shadow.md",
						],
					),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					root: what.both(
						[
							"text-lg",
							"px-6",
							"py-2",
						],
						[
							"shadow.lg",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "dark",
			disabled: false,
			borderless: false,
			size: "md",
		}),
	}),
);

export type BadgeCls = typeof BadgeCls;

export namespace BadgeCls {
	export type Props<P = unknown> = Component<BadgeCls, P>;
}
