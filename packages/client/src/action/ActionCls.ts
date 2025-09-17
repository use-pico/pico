import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ActionCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
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
				root: what.both(
					[
						"Action-root",
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
					root: what.token([
						"icon.xs",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.token([
						"icon.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.token([
						"icon.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					root: what.token([
						"icon.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xl",
				}),
				{
					root: what.token([
						"icon.xl",
					]),
				},
			),
			// Tone rules (dark)
			def.rule(
				what.variant({
					tone: "unset",
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
					tone: "link",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.link.dark.set",
					]),
				},
			),
			// Tone rules (light)
			def.rule(
				what.variant({
					tone: "unset",
					theme: "unset",
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
					theme: "unset",
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
					theme: "unset",
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
					theme: "unset",
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
					theme: "unset",
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
					theme: "unset",
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
					theme: "unset",
				}),
				{
					root: what.token([
						"tone.link.light.set",
					]),
				},
			),
			// Disabled
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.token([
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
					root: what.token([
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
					root: what.css([
						"border-none",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "unset",
			theme: "unset",
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
