import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ButtonCls = PicoCls.extend(
	{
		tokens: [
			"button.size.xs",
			"button.size.sm",
			"button.size.md",
		],
		slot: [
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
			],
			borderless: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({
			"button.size.xs": what.css([
				"px-2",
				"py-0.5",
				"text-xs",
			]),
			"button.size.sm": what.css([
				"px-4",
				"py-2",
				"text-sm",
			]),
			"button.size.md": what.css([
				"px-6",
				"py-2",
				"text-base",
			]),
		}),
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
						"border",
						"select-none",
						"active:scale-95",
						"active:opacity-90",
						"hover:scale-105",
					],
					[
						"shadow.sm",
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
					root: what.token([
						"button.size.xs",
						"round.sm",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.token([
						"button.size.sm",
						"round.md",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.token([
						"button.size.md",
						"round.lg",
						"shadow.md",
					]),
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
					tone: "primary",
					theme: "light",
				}),
				{
					root: what.token([
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
					theme: "dark",
				}),
				{
					root: what.token([
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
					tone: "secondary",
					theme: "light",
				}),
				{
					root: what.token([
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
					theme: "dark",
				}),
				{
					root: what.token([
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
					tone: "danger",
					theme: "light",
				}),
				{
					root: what.token([
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
					theme: "dark",
				}),
				{
					root: what.token([
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
					tone: "warning",
					theme: "light",
				}),
				{
					root: what.token([
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
					theme: "dark",
				}),
				{
					root: what.token([
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
					tone: "neutral",
					theme: "light",
				}),
				{
					root: what.token([
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
					theme: "dark",
				}),
				{
					root: what.token([
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
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "light",
				}),
				{
					root: what.token([
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
			/**
			 * Disabled
			 */
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"opacity-60",
						"cursor-not-allowed",
						"pointer-events-none",
						"shadow-none",
					]),
				},
			),
			/**
			 * Borderless
			 */
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
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
			disabled: false,
			size: "md",
			borderless: false,
		}),
	}),
);

export type ButtonCls = typeof ButtonCls;

export namespace ButtonCls {
	export type Props<P = unknown> = Component<ButtonCls, P>;
}
