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
	{
		token: {},
		rules: ({ root, rule, classes }) => [
			root({
				base: classes([
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
			rule(
				{
					active: true,
				},
				{
					base: classes([
						"shadow-md",
					]),
				},
			),
			rule(
				{
					variant: "primary",
				},
				{
					base: classes([
						"bg-(--pico-color-primary-bg-default)",
						"border-(--pico-color-primary-border-default)",
						"text-(--pico-color-primary-text-default)",
					]),
				},
			),
			rule(
				{
					variant: "secondary",
				},
				{
					base: classes([
						"bg-(--pico-color-secondary-bg-default)",
						"border-(--pico-color-secondary-border-default)",
						"text-(--pico-color-secondary-text-default)",
					]),
				},
			),
			rule(
				{
					variant: "danger",
				},
				{
					base: classes([
						"bg-(--pico-color-danger-bg-default)",
						"border-(--pico-color-danger-border-default)",
						"text-(--pico-color-danger-text-default)",
					]),
				},
			),
			rule(
				{
					variant: "danger-light",
				},
				{
					base: classes([
						"bg-(--pico-color-danger-light-bg-default)",
						"border-(--pico-color-danger-light-border-default)",
						"text-(--pico-color-danger-light-text-default)",
					]),
				},
			),
			rule(
				{
					variant: "light",
				},
				{
					base: classes([
						"bg-(--pico-color-light-bg-default)",
						"border-(--pico-color-light-border-default)",
						"text-(--pico-color-light-text-default)",
					]),
				},
			),
			rule(
				{
					variant: "subtle",
				},
				{
					base: classes([
						"bg-(--pico-color-subtle-bg-default)",
						"border-(--pico-color-subtle-border-default)",
						"text-(--pico-color-subtle-text-default)",
					]),
				},
			),
			rule(
				{
					variant: "neutral",
				},
				{
					base: classes([
						"bg-(--pico-color-neutral-bg-default)",
						"border-(--pico-color-neutral-border-default)",
						"text-(--pico-color-neutral-text-default)",
					]),
				},
			),
			rule(
				{
					borderless: true,
				},
				{
					base: classes([
						"border-none",
					]),
				},
			),
			rule(
				{
					size: "xs",
				},
				{
					base: classes([
						"text-xs",
						"px-2",
						"py-0.5",
					]),
				},
			),
			rule(
				{
					size: "sm",
				},
				{
					base: classes([
						"text-sm",
						"px-2",
						"py-1",
					]),
				},
			),
			rule(
				{
					size: "md",
				},
				{
					base: classes([
						"text-md",
						"px-3",
						"py-1.5",
					]),
				},
			),
			rule(
				{
					size: "lg",
				},
				{
					base: classes([
						"text-lg",
						"px-4",
						"py-2",
					]),
				},
			),
		],
		defaults: {
			active: false,
			variant: "light",
			borderless: false,
			size: "md",
		},
	},
);

export namespace BadgeCls {
	export type Props<P = unknown> = Component<typeof BadgeCls, P>;
}
