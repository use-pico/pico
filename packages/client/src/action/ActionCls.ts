import type { Component } from "@use-pico/cls";
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
						"square.xs",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					base: what.token([
						"square.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					base: what.token([
						"square.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					base: what.token([
						"square.lg",
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
						"tone.primary.dark.text",
						"tone.primary.dark.text:hover",
						"tone.primary.dark.bg",
						"tone.primary.dark.bg:hover",
						"tone.primary.dark.border",
						"tone.primary.dark.border:hover",
						"tone.primary.dark.shadow",
						"tone.primary.dark.shadow:hover",
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
						"tone.secondary.dark.text:hover",
						"tone.secondary.dark.bg",
						"tone.secondary.dark.bg:hover",
						"tone.secondary.dark.border",
						"tone.secondary.dark.border:hover",
						"tone.secondary.dark.shadow",
						"tone.secondary.dark.shadow:hover",
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
						"tone.danger.dark.text:hover",
						"tone.danger.dark.bg",
						"tone.danger.dark.bg:hover",
						"tone.danger.dark.border",
						"tone.danger.dark.border:hover",
						"tone.danger.dark.shadow",
						"tone.danger.dark.shadow:hover",
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
						"tone.warning.dark.text:hover",
						"tone.warning.dark.bg",
						"tone.warning.dark.bg:hover",
						"tone.warning.dark.border",
						"tone.warning.dark.border:hover",
						"tone.warning.dark.shadow",
						"tone.warning.dark.shadow:hover",
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
						"tone.neutral.dark.text:hover",
						"tone.neutral.dark.bg",
						"tone.neutral.dark.bg:hover",
						"tone.neutral.dark.border",
						"tone.neutral.dark.border:hover",
						"tone.neutral.dark.shadow",
						"tone.neutral.dark.shadow:hover",
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
						"tone.subtle.dark.text:hover",
						"tone.subtle.dark.bg",
						"tone.subtle.dark.bg:hover",
						"tone.subtle.dark.border",
						"tone.subtle.dark.border:hover",
						"tone.subtle.dark.shadow",
						"tone.subtle.dark.shadow:hover",
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
						"tone.primary.light.text",
						"tone.primary.light.text:hover",
						"tone.primary.light.bg",
						"tone.primary.light.bg:hover",
						"tone.primary.light.border",
						"tone.primary.light.border:hover",
						"tone.primary.light.shadow",
						"tone.primary.light.shadow:hover",
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
						"tone.secondary.light.text:hover",
						"tone.secondary.light.bg",
						"tone.secondary.light.bg:hover",
						"tone.secondary.light.border",
						"tone.secondary.light.border:hover",
						"tone.secondary.light.shadow",
						"tone.secondary.light.shadow:hover",
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
						"tone.danger.light.text:hover",
						"tone.danger.light.bg",
						"tone.danger.light.bg:hover",
						"tone.danger.light.border",
						"tone.danger.light.border:hover",
						"tone.danger.light.shadow",
						"tone.danger.light.shadow:hover",
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
						"tone.warning.light.text:hover",
						"tone.warning.light.bg",
						"tone.warning.light.bg:hover",
						"tone.warning.light.border",
						"tone.warning.light.border:hover",
						"tone.warning.light.shadow",
						"tone.warning.light.shadow:hover",
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
						"tone.neutral.light.text:hover",
						"tone.neutral.light.bg",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.border",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
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
						"tone.subtle.light.text:hover",
						"tone.subtle.light.bg",
						"tone.subtle.light.bg:hover",
						"tone.subtle.light.border",
						"tone.subtle.light.border:hover",
						"tone.subtle.light.shadow",
						"tone.subtle.light.shadow:hover",
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
			theme: "dark",
			disabled: false,
			loading: false,
			border: false,
			size: "xs",
		}),
	}),
);

export type ActionCls = typeof ActionCls;

export namespace ActionCls {
	export type Props<P = unknown> = Component<ActionCls, P>;
}
