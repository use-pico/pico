import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ButtonCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"wrapper",
			"root",
		],
		variant: {
			disabled: [
				"bool",
			],
			size: [
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
			],
			border: [
				"bool",
			],
			round: [
				"default",
				"sm",
				"md",
				"lg",
				"xl",
				"full",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				wrapper: what.css([
					"Button-wrapper",
				]),
				root: what.both(
					[
						"Button-root",
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
					root: what.token([
						"size.xs",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.token([
						"size.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.token([
						"size.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					root: what.token([
						"size.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xl",
				}),
				{
					root: what.token([
						"size.xl",
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
			/**
			 * Round rules
			 */
			def.rule(
				what.variant({
					round: "default",
				}),
				{
					root: what.token([
						"round.default",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "sm",
				}),
				{
					root: what.token([
						"round.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "md",
				}),
				{
					root: what.token([
						"round.md",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "lg",
				}),
				{
					root: what.token([
						"round.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "xl",
				}),
				{
					root: what.token([
						"round.xl",
					]),
				},
			),
			def.rule(
				what.variant({
					round: "full",
				}),
				{
					root: what.token([
						"round.full",
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
			round: "default",
		}),
	}),
);

export type ButtonCls = typeof ButtonCls;

export namespace ButtonCls {
	export type Props<P = unknown> = Cls.Props<ButtonCls, P>;
}
