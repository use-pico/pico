import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ProgressCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"progress",
		],
		variant: {
			size: [
				"xs",
				"sm",
				"md",
				"lg",
			],
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
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"h-full",
						"w-full",
						"transition-all",
					],
					[
						"round.default",
						"tone.neutral.light.bg",
						"shadow.sm",
					],
				),
				progress: what.both(
					[
						"h-full",
						"leading-none",
						"transition-all",
					],
					[
						"round.default",
					],
				),
			}),
			// Size variants
			def.rule(
				what.variant({
					size: "xs",
				}),
				{
					base: what.css([
						"h-0.5",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					base: what.css([
						"h-1",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					base: what.css([
						"h-2",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					base: what.css([
						"h-4",
					]),
				},
			),
			// Tone variants for progress bar (light theme)
			def.rule(
				what.variant({
					tone: "primary",
					theme: "light",
				}),
				{
					progress: what.token([
						"tone.primary.light.bg",
						"tone.primary.light.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					theme: "light",
				}),
				{
					progress: what.token([
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					theme: "light",
				}),
				{
					progress: what.token([
						"tone.danger.light.bg",
						"tone.danger.light.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					theme: "light",
				}),
				{
					progress: what.token([
						"tone.warning.light.bg",
						"tone.warning.light.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					theme: "light",
				}),
				{
					progress: what.token([
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "light",
				}),
				{
					progress: what.token([
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
						"shadow.sm",
					]),
				},
			),
			// Tone variants for progress bar (dark theme)
			def.rule(
				what.variant({
					tone: "primary",
					theme: "dark",
				}),
				{
					progress: what.token([
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "secondary",
					theme: "dark",
				}),
				{
					progress: what.token([
						"tone.secondary.dark.bg",
						"tone.secondary.dark.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "danger",
					theme: "dark",
				}),
				{
					progress: what.token([
						"tone.danger.dark.bg",
						"tone.danger.dark.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "warning",
					theme: "dark",
				}),
				{
					progress: what.token([
						"tone.warning.dark.bg",
						"tone.warning.dark.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "neutral",
					theme: "dark",
				}),
				{
					progress: what.token([
						"tone.neutral.dark.bg",
						"tone.neutral.dark.border",
						"shadow.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "subtle",
					theme: "dark",
				}),
				{
					progress: what.token([
						"tone.subtle.dark.bg",
						"tone.subtle.dark.border",
						"shadow.sm",
					]),
				},
			),
		],
		defaults: def.defaults({
			size: "md",
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type ProgressCls = typeof ProgressCls;

export namespace ProgressCls {
	export type Props<P = unknown> = Cls.Props<typeof ProgressCls, P>;
}
