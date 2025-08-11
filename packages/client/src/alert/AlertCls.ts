import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AlertCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"title",
			"message",
			"body",
		],
		variant: {
			variant: [
				"info",
				"success",
				"warning",
				"error",
				"neutral",
				"subtle",
			],
			clickable: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"pico--alert",
					"border",
					"rounded",
					"py-2",
					"px-3",
					"flex",
					"flex-col",
					"border-(--pico-color-border-default)",
					"bg-(--pico-color-bg-default)",
					"text-(--pico-color-text-default)",
				]),
				title: what.css([
					"font-semibold",
					"w-full",
				]),
				message: what.css([
					"opacity-85",
					"text-sm",
					"w-full",
				]),
				body: what.css([
					"border-t",
					"w-full",
					"border-(--pico-color-border-default)",
				]),
			}),
			def.rule(
				what.variant({
					variant: "info",
					clickable: true,
				}),
				{
					base: what.css([
						"hover:bg-(--color-info-clickable-hover-bg)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "success",
					clickable: true,
				}),
				{
					base: what.css([
						"hover:bg-(--color-success-clickable-hover-bg)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "warning",
					clickable: true,
				}),
				{
					base: what.css([
						"hover:bg-(--color-warning-clickable-hover-bg)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "error",
					clickable: true,
				}),
				{
					base: what.css([
						"hover:bg-(--color-error-clickable-hover-bg)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "neutral",
					clickable: true,
				}),
				{
					base: what.css([
						"hover:bg-(--color-neutral-clickable-hover-bg)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "subtle",
					clickable: true,
				}),
				{
					base: what.css([
						"hover:bg-(--color-subtle-clickable-hover-bg)",
					]),
				},
			),
		],
		defaults: def.defaults({
			clickable: false,
			variant: "info",
		}),
	}),
);

export type AlertCls = typeof AlertCls;

export namespace AlertCls {
	export type Props<P = unknown> = Component<AlertCls, P>;
}
