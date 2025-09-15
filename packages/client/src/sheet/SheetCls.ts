import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const SheetCls = PicoCls.extend(
	{
		tokens: [],
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
				"link",
			],
			theme: [
				"light",
				"dark",
			],
			round: [
				"none",
				"default",
				"sm",
				"md",
				"lg",
				"xl",
				"full",
			],
			disabled: [
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
						"Sheet-root",
						"grid",
						"grid-cols-1",
						"content-center",
						"min-h-0",
						"min-w-0",
						"w-full",
						"h-full",
					],
					[
						"border.default",
						"shadow.default",
					],
				),
			}),
			// Tone colors (dark / light)
			def.rule(
				what.variant({
					tone: "primary",
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
					tone: "primary",
					theme: "light",
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
					tone: "secondary",
					theme: "light",
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
					tone: "danger",
					theme: "light",
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
					tone: "warning",
					theme: "light",
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
					tone: "neutral",
					theme: "light",
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
					tone: "subtle",
					theme: "light",
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
			def.rule(
				what.variant({
					tone: "link",
					theme: "light",
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
			// Round variants
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
			// Disabled variant
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"opacity-60",
						"pointer-events-none",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
			round: "xl",
			disabled: false,
		}),
	}),
);

export type SheetCls = typeof SheetCls;

export namespace SheetCls {
	export type Props<P = unknown> = Cls.Props<SheetCls, P>;
}
