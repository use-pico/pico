import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ButtonCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"wrapper",
			"root",
		],
		variant: {
			tone: [
				"primary",
				"secondary",
				"danger",
				"warning",
				"neutral",
				"subtle",
				"link",
			],
			theme: [
				"light",
				"dark",
			],
			disabled: [
				"bool",
			],
			size: [
				"xs",
				"sm",
				"md",
				"lg",
			],
			border: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
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
						"select-none",
						"active:opacity-90",
					],
					[
						"scale.default",
						"border.default",
						"round.default",
						"shadow.default",
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
					root: what.both(
						[
							"text-xs",
						],
						[
							"padding.xs",
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
						],
						[
							"padding.sm",
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
						],
						[
							"padding.md",
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
						],
						[
							"padding.lg",
						],
					),
				},
			),
			/**
			 * Tone rules
			 */
			def.rule(
				what.variant({
					tone: "primary",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.primary.dark.set",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "primary",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.primary.light.set",
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
						"tone.secondary.dark.set",
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
						"tone.secondary.light.set",
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
						"tone.danger.dark.set",
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
						"tone.danger.light.set",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.warning.dark.set",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.warning.light.set",
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
						"tone.neutral.dark.set",
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
						"tone.neutral.light.set",
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
						"tone.subtle.dark.set",
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
						"tone.subtle.light.set",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "link",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.link.dark.set",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "link",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.link.light.set",
					]),
				},
			),
			/**
			 * Disabled
			 */
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					wrapper: what.css([
						"cursor-not-allowed",
					]),
					root: what.token([
						"disabled",
					]),
				},
			),
			/**
			 * Border
			 */
			def.rule(
				what.variant({
					border: false,
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
			theme: "light",
			disabled: false,
			size: "md",
			border: true,
		}),
	}),
);

export type ButtonCls = typeof ButtonCls;

export namespace ButtonCls {
	export type Props<P = unknown> = Component<ButtonCls, P>;
}
