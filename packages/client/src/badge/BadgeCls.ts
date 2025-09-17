import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BadgeCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			disabled: [
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
						"Badge-root",
						"flex-row",
						"flex",
						"font-bold",
						"gap-2",
						"items-center",
						"select-none",
						"text-sm",
						"rounded-full",
						"w-fit",
					],
					[
						"border.default",
						"shadow.default",
					],
				),
			}),
			// Tone rules using tokens (dark background)
			def.rule(
				what.variant({
					tone: "unset",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.primary.dark.text",
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
						"tone.primary.dark.shadow",
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
						"tone.secondary.dark.bg",
						"tone.secondary.dark.border",
						"tone.secondary.dark.shadow",
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
						"tone.danger.dark.bg",
						"tone.danger.dark.border",
						"tone.danger.dark.shadow",
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
						"tone.warning.dark.bg",
						"tone.warning.dark.border",
						"tone.warning.dark.shadow",
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
						"tone.neutral.dark.bg",
						"tone.neutral.dark.border",
						"tone.neutral.dark.shadow",
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
						"tone.subtle.dark.bg",
						"tone.subtle.dark.border",
						"tone.subtle.dark.shadow",
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
						"tone.link.dark.text",
						"tone.link.dark.bg",
						"tone.link.dark.border",
						"tone.link.dark.shadow",
					]),
				},
			),

			// Tone rules using tokens (light background)
			def.rule(
				what.variant({
					tone: "unset",
					theme: "unset",
				}),
				{
					root: what.token([
						"tone.primary.light.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
						"tone.primary.light.shadow",
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
						"tone.secondary.light.text",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
						"tone.secondary.light.shadow",
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
						"tone.danger.light.text",
						"tone.danger.light.bg",
						"tone.danger.light.border",
						"tone.danger.light.shadow",
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
						"tone.warning.light.text",
						"tone.warning.light.bg",
						"tone.warning.light.border",
						"tone.warning.light.shadow",
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
						"tone.neutral.light.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
						"tone.neutral.light.shadow",
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
						"tone.subtle.light.text",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
						"tone.subtle.light.shadow",
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
						"tone.link.light.text",
						"tone.link.light.bg",
						"tone.link.light.border",
						"tone.link.light.shadow",
					]),
				},
			),
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
			// Disabled
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"opacity-60",
						"cursor-not-allowed",
						"pointer-events-none",
					]),
				},
			),
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
		],
		defaults: def.defaults({
			tone: "unset",
			theme: "unset",
			disabled: false,
			border: true,
			size: "md",
		}),
	}),
);

export type BadgeCls = typeof BadgeCls;

export namespace BadgeCls {
	export type Props<P = unknown> = Cls.Props<BadgeCls, P>;
}
