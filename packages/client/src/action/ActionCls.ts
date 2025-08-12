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
						"active:scale-95",
						"hover:scale-110",
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
					tone: "secondary",
					light: false,
				}),
				{
					base: what.token([
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
					tone: "danger",
					light: false,
				}),
				{
					base: what.token([
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
					tone: "neutral",
					light: false,
				}),
				{
					base: what.token([
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
					tone: "subtle",
					light: false,
				}),
				{
					base: what.token([
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
			// Tone rules (light)
			def.rule(
				what.variant({
					tone: "primary",
					light: true,
				}),
				{
					base: what.token([
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
			def.rule(
				what.variant({
					tone: "secondary",
					light: true,
				}),
				{
					base: what.token([
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
			def.rule(
				what.variant({
					tone: "danger",
					light: true,
				}),
				{
					base: what.token([
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
			def.rule(
				what.variant({
					tone: "neutral",
					light: true,
				}),
				{
					base: what.token([
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
			def.rule(
				what.variant({
					tone: "subtle",
					light: true,
				}),
				{
					base: what.token([
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
