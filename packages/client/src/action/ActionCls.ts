import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ActionCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
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
			disabled: [
				"bool",
			],
			loading: [
				"bool",
			],
			border: [
				"bool",
			],
			size: [
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
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
						"select-none",
					],
					[
						"scale.default",
						"round.default",
						"shadow.default",
						"border.default",
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
					base: what.token([
						"icon.xs",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					base: what.token([
						"icon.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					base: what.token([
						"icon.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					base: what.token([
						"icon.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xl",
				}),
				{
					base: what.token([
						"icon.xl",
					]),
				},
			),
			// Tone rules (dark)
			def.rule(
				what.variant({
					tone: "primary",
					theme: "dark",
				}),
				{
					base: what.token([
						"tone.primary.dark.set",
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
						"tone.secondary.dark.set",
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
						"tone.danger.dark.set",
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
						"tone.warning.dark.set",
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
						"tone.neutral.dark.set",
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
						"tone.subtle.dark.set",
					]),
				},
			),
			// Tone rules (light)
			def.rule(
				what.variant({
					tone: "primary",
					theme: "light",
				}),
				{
					base: what.token([
						"tone.primary.light.set",
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
						"tone.secondary.light.set",
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
						"tone.danger.light.set",
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
						"tone.warning.light.set",
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
						"tone.neutral.light.set",
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
						"tone.subtle.light.set",
					]),
				},
			),
			// Disabled
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.token([
						"disabled",
					]),
				},
			),
			// Loading
			def.rule(
				what.variant({
					loading: true,
				}),
				{
					base: what.token([
						"disabled",
					]),
				},
			),
			// Border
			def.rule(
				what.variant({
					border: false,
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
			theme: "light",
			disabled: false,
			loading: false,
			border: true,
			size: "md",
		}),
	}),
);

export type ActionCls = typeof ActionCls;

export namespace ActionCls {
	export type Props<P = unknown> = Cls.Props<ActionCls, P>;
}
