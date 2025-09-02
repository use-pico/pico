import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IconCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
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
			],
			size: [
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
			],
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			/**
			 * Size rules
			 */
			def.rule(
				what.variant({
					size: "xs",
				}),
				{
					root: what.token([
						"inner-icon.xs",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.token([
						"inner-icon.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.token([
						"inner-icon.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					root: what.token([
						"inner-icon.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xl",
				}),
				{
					root: what.token([
						"inner-icon.xl",
					]),
				},
			),
			/**
			 * Tone rules
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
			/**
			 * Disabled
			 */
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"pointer-events-none",
						"opacity-50",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "inherit",
			theme: "light",
			size: "md",
			disabled: false,
		}),
	}),
);

export type IconCls = typeof IconCls;

export namespace IconCls {
	export type Props<P = unknown> = Component<IconCls, P>;
}
