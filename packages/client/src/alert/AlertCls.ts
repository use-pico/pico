import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AlertCls = PicoCls.extend(
	{
		tokens: {},
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
				"neutral",
				"subtle",
			],
			light: [
				"bool",
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
					light: false,
				}),
				{
					base: what.token([
						"primary.color.text-light",
						"primary.color.bg-dark",
						"primary.color.border-dark",
					]),
					body: what.token([
						"primary.color.border-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "primary",
					light: true,
				}),
				{
					base: what.token([
						"primary.color.text-dark",
						"primary.color.bg-light",
						"primary.color.border-light",
					]),
					body: what.token([
						"primary.color.border-light",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					light: false,
				}),
				{
					base: what.token([
						"secondary.color.text-light",
						"secondary.color.bg-dark",
						"secondary.color.border-dark",
					]),
					body: what.token([
						"secondary.color.border-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					light: true,
				}),
				{
					base: what.token([
						"secondary.color.text-dark",
						"secondary.color.bg-light",
						"secondary.color.border-light",
					]),
					body: what.token([
						"secondary.color.border-light",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					light: false,
				}),
				{
					base: what.token([
						"danger.color.text-light",
						"danger.color.bg-dark",
						"danger.color.border-dark",
					]),
					body: what.token([
						"danger.color.border-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					light: true,
				}),
				{
					base: what.token([
						"danger.color.text-dark",
						"danger.color.bg-light",
						"danger.color.border-light",
					]),
					body: what.token([
						"danger.color.border-light",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					light: false,
				}),
				{
					base: what.token([
						"neutral.color.text-dark",
						"neutral.color.bg-dark",
						"neutral.color.border-dark",
					]),
					body: what.token([
						"neutral.color.border-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					light: true,
				}),
				{
					base: what.token([
						"neutral.color.text-dark",
						"neutral.color.bg-light",
						"neutral.color.border-light",
					]),
					body: what.token([
						"neutral.color.border-light",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					light: false,
				}),
				{
					base: what.token([
						"subtle.color.text-dark",
						"subtle.color.bg-dark",
						"subtle.color.border-dark",
					]),
					body: what.token([
						"subtle.color.border-dark",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					light: true,
				}),
				{
					base: what.token([
						"subtle.color.text-dark",
						"subtle.color.bg-light",
						"subtle.color.border-light",
					]),
					body: what.token([
						"subtle.color.border-light",
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
			light: false,
		}),
	}),
);

export type AlertCls = typeof AlertCls;

export namespace AlertCls {
	export type Props<P = unknown> = Component<AlertCls, P>;
}
