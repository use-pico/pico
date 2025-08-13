import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AlertCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"title",
			"message",
			"body",
		],
		variant: {
			tone: [
				"primary",
				"secondary",
				"danger",
				"warning",
				"neutral",
				"subtle",
			],
			theme: [
				"light",
				"dark",
			],
			clickable: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"pico--alert",
					"border",
					"rounded",
					"py-2",
					"px-3",
					"flex",
					"flex-col",
				]),
				title: what.css([
					"font-semibold",
					"w-full",
				]),
				message: what.css([
					"opacity-85",
					"text-sm",
					"w-full",
				]),
				body: what.css([
					"border-t",
					"w-full",
				]),
			}),
			// Tone colors (dark / light)
			def.rule(
				what.variant({
					tone: "primary",
					theme: "dark",
				}),
				{
					base: what.token([
						"tone.primary.dark.text",
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
					]),
					body: what.token([
						"tone.primary.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "primary",
					theme: "light",
				}),
				{
					base: what.token([
						"tone.primary.light.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
					]),
					body: what.token([
						"tone.primary.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					theme: "dark",
				}),
				{
					base: what.token([
						"tone.secondary.dark.text",
						"tone.secondary.dark.bg",
						"tone.secondary.dark.border",
					]),
					body: what.token([
						"tone.secondary.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					theme: "light",
				}),
				{
					base: what.token([
						"tone.secondary.light.text",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
					]),
					body: what.token([
						"tone.secondary.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					theme: "dark",
				}),
				{
					base: what.token([
						"tone.danger.dark.text",
						"tone.danger.dark.bg",
						"tone.danger.dark.border",
					]),
					body: what.token([
						"tone.danger.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					theme: "light",
				}),
				{
					base: what.token([
						"tone.danger.light.text",
						"tone.danger.light.bg",
						"tone.danger.light.border",
					]),
					body: what.token([
						"tone.danger.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					theme: "dark",
				}),
				{
					base: what.token([
						"tone.warning.dark.text",
						"tone.warning.dark.bg",
						"tone.warning.dark.border",
					]),
					body: what.token([
						"tone.warning.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					theme: "light",
				}),
				{
					base: what.token([
						"tone.warning.light.text",
						"tone.warning.light.bg",
						"tone.warning.light.border",
					]),
					body: what.token([
						"tone.warning.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					theme: "dark",
				}),
				{
					base: what.token([
						"tone.neutral.dark.text",
						"tone.neutral.dark.bg",
						"tone.neutral.dark.border",
					]),
					body: what.token([
						"tone.neutral.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					theme: "light",
				}),
				{
					base: what.token([
						"tone.neutral.light.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
					]),
					body: what.token([
						"tone.neutral.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "dark",
				}),
				{
					base: what.token([
						"tone.subtle.dark.text",
						"tone.subtle.dark.bg",
						"tone.subtle.dark.border",
					]),
					body: what.token([
						"tone.subtle.dark.border",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "light",
				}),
				{
					base: what.token([
						"tone.subtle.light.text",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
					]),
					body: what.token([
						"tone.subtle.light.border",
					]),
				},
			),
			// Clickable affordance
			def.rule(
				what.variant({
					clickable: true,
				}),
				{
					base: what.css([
						"group",
						"cursor-pointer",
						"transition-all",
						"hover:shadow-md",
						"active:scale-99",
						"active:opacity-90",
						"hover:scale-101",
					]),
				},
			),
		],
		defaults: def.defaults({
			clickable: false,
			tone: "primary",
			theme: "dark",
		}),
	}),
);

export type AlertCls = typeof AlertCls;

export namespace AlertCls {
	export type Props<P = unknown> = Component<AlertCls, P>;
}
