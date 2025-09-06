import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TypoCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			size: [
				"inherit",
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
			],
			font: [
				"inherit",
				"normal",
				"semi",
				"bold",
			],
			tone: [
				"inherit",
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
				"inherit",
			],
			italic: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.rule(
				{
					size: "xs",
				},
				{
					root: what.css([
						"text-xs",
					]),
				},
			),
			def.rule(
				{
					size: "sm",
				},
				{
					root: what.css([
						"text-sm",
					]),
				},
			),
			def.rule(
				{
					size: "md",
				},
				{
					root: what.css([
						"text-base",
					]),
				},
			),
			def.rule(
				{
					size: "lg",
				},
				{
					root: what.css([
						"text-lg",
					]),
				},
			),
			def.rule(
				{
					size: "xl",
				},
				{
					root: what.css([
						"text-xl",
					]),
				},
			),
			def.rule(
				{
					font: "normal",
				},
				{
					root: what.css([
						"font-normal",
					]),
				},
			),
			def.rule(
				{
					font: "semi",
				},
				{
					root: what.css([
						"font-semibold",
					]),
				},
			),
			def.rule(
				{
					font: "bold",
				},
				{
					root: what.css([
						"font-bold",
					]),
				},
			),
			/**
			 * Tone rules with theme control
			 */
			def.rule(
				what.variant({
					tone: "primary",
					theme: "light",
				}),
				{
					root: what.token([
						"tone.primary.light.text",
					]),
				},
			),
			def.rule(
				what.variant({
					tone: "primary",
					theme: "dark",
				}),
				{
					root: what.token([
						"tone.primary.dark.text",
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
					]),
				},
			),
			def.rule(
				what.variant({
					italic: true,
				}),
				{
					root: what.css([
						"italic",
					]),
				},
			),
		],
		defaults: def.defaults({
			size: "md",
			font: "normal",
			tone: "inherit",
			theme: "light",
			italic: false,
		}),
	}),
);

export type TypoCls = typeof TypoCls;

export namespace TypoCls {
	export type Props<P = unknown> = Cls.Props<TypoCls, P>;
}
