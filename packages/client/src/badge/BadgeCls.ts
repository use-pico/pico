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
			light: [
				"bool",
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
					"rounded-2xl",
					"select-none",
					"text-sm",
				]),
			}),
			// Tone rules using tokens (dark background)
			def.rule(
				what.variant({
					tone: "primary",
					light: false,
				}),
				{
					root: what.token([
						"tone.primary.light.text",
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					light: false,
				}),
				{
					root: what.token([
						"tone.secondary.light.text",
						"tone.secondary.dark.bg",
						"tone.secondary.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					light: false,
				}),
				{
					root: what.token([
						"tone.danger.light.text",
						"tone.danger.dark.bg",
						"tone.danger.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					light: false,
				}),
				{
					root: what.token([
						"tone.neutral.dark.text",
						"tone.neutral.dark.bg",
						"tone.neutral.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					light: false,
				}),
				{
					root: what.token([
						"tone.subtle.dark.text",
						"tone.subtle.dark.bg",
						"tone.subtle.dark.border",
					]),
				},
			),

			// Tone rules using tokens (light background)
			def.rule(
				what.variant({
					tone: "primary",
					light: true,
				}),
				{
					root: what.token([
						"tone.primary.dark.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
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
						"tone.secondary.dark.text",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
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
						"tone.danger.dark.text",
						"tone.danger.light.bg",
						"tone.danger.light.border",
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
						"tone.neutral.dark.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
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
						"tone.subtle.dark.text",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
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
					root: what.css([
						"text-xs",
						"px-2",
						"py-0.5",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.css([
						"text-sm",
						"px-3",
						"py-1",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.css([
						"text-md",
						"px-4",
						"py-1.5",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					root: what.css([
						"text-lg",
						"px-6",
						"py-2",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			light: false,
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
