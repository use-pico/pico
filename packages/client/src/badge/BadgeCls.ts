import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BadgeCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {
			active: [
				"bool",
			],
			variant: [
				"primary",
				"secondary",
				"danger",
				"danger-light",
				"light",
				"subtle",
				"neutral",
			],
			borderless: [
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
				base: what.css([
					"border",
					"flex-row",
					"flex",
					"font-bold",
					"gap-2",
					"items-center",
					"px-4",
					"py-1",
					"rounded-2xl",
					"text-sm",
				]),
			}),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					base: what.css([
						"shadow-md",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "primary",
				}),
				{
					base: what.css([
						"bg-(--pico-color-primary-bg-default)",
						"border-(--pico-color-primary-border-default)",
						"text-(--pico-color-primary-text-default)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "secondary",
				}),
				{
					base: what.css([
						"bg-(--pico-color-secondary-bg-default)",
						"border-(--pico-color-secondary-border-default)",
						"text-(--pico-color-secondary-text-default)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "danger",
				}),
				{
					base: what.css([
						"bg-(--pico-color-danger-bg-default)",
						"border-(--pico-color-danger-border-default)",
						"text-(--pico-color-danger-text-default)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "danger-light",
				}),
				{
					base: what.css([
						"bg-(--pico-color-danger-light-bg-default)",
						"border-(--pico-color-danger-light-border-default)",
						"text-(--pico-color-danger-light-text-default)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "light",
				}),
				{
					base: what.css([
						"bg-(--pico-color-light-bg-default)",
						"border-(--pico-color-light-border-default)",
						"text-(--pico-color-light-text-default)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "subtle",
				}),
				{
					base: what.css([
						"bg-(--pico-color-subtle-bg-default)",
						"border-(--pico-color-subtle-border-default)",
						"text-(--pico-color-subtle-text-default)",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "neutral",
				}),
				{
					base: what.css([
						"bg-(--pico-color-neutral-bg-default)",
						"border-(--pico-color-neutral-border-default)",
						"text-(--pico-color-neutral-text-default)",
					]),
				},
			),
			def.rule(
				what.variant({
					borderless: true,
				}),
				{
					base: what.css([
						"border-none",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xs",
				}),
				{
					base: what.css([
						"text-xs",
						"px-2",
						"py-0.5",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					base: what.css([
						"text-sm",
						"px-2",
						"py-1",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					base: what.css([
						"text-md",
						"px-3",
						"py-1.5",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					base: what.css([
						"text-lg",
						"px-4",
						"py-2",
					]),
				},
			),
		],
		defaults: def.defaults({
			active: false,
			variant: "light",
			borderless: false,
			size: "md",
		}),
	}),
);

export type BadgeCls = typeof BadgeCls;

export namespace BadgeCls {
	export type Props<P = unknown> = Component<BadgeCls, P>;
}
