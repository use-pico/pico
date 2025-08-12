import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ActionCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
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
			loading: [
				"bool",
			],
			borderless: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"flex",
						"items-center",
						"justify-center",
						"gap-2",
						"group",
						"transition-all",
						"cursor-pointer",
						"border",
						"px-1",
						"py-1",
						"rounded-md",
						"select-none",
					],
					[
						"shadow.sm",
					],
				),
			}),
			// Tone rules (dark)
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
						"primary.color.shadow-dark",
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
						"secondary.color.shadow-dark",
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
						"danger.color.shadow-dark",
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
						"neutral.color.shadow-dark",
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
						"subtle.color.shadow-dark",
					]),
				},
			),
			// Tone rules (light)
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
						"primary.color.shadow-light",
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
						"secondary.color.shadow-light",
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
						"danger.color.shadow-light",
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
						"neutral.color.shadow-light",
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
						"subtle.color.shadow-light",
					]),
				},
			),
			// Disabled
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"opacity-60",
						"cursor-not-allowed",
						"pointer-events-none",
						"shadow-none",
					]),
				},
			),
			// Loading
			def.rule(
				what.variant({
					loading: true,
				}),
				{
					base: what.css([
						"pointer-events-none",
						"opacity-60",
					]),
				},
			),
			// Borderless
			def.rule(
				what.variant({
					borderless: true,
				}),
				{
					base: what.css([
						"border-none",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			light: false,
			disabled: false,
			loading: false,
			borderless: false,
		}),
	}),
);

export type ActionCls = typeof ActionCls;

export namespace ActionCls {
	export type Props<P = unknown> = Component<ActionCls, P>;
}
