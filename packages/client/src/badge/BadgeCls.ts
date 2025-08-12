import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BadgeCls = PicoCls.extend(
	{
		tokens: {},
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
						"primary.color.text-light",
						"primary.color.bg-dark",
						"primary.color.border-dark",
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
						"secondary.color.text-light",
						"secondary.color.bg-dark",
						"secondary.color.border-dark",
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
						"danger.color.text-light",
						"danger.color.bg-dark",
						"danger.color.border-dark",
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
						"neutral.color.text-dark",
						"neutral.color.bg-dark",
						"neutral.color.border-dark",
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
						"subtle.color.text-dark",
						"subtle.color.bg-dark",
						"subtle.color.border-dark",
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
						"primary.color.text-dark",
						"primary.color.bg-light",
						"primary.color.border-light",
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
