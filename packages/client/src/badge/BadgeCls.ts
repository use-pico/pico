import { type Component, classes, match, variant } from "@use-pico/cls";

export const BadgeCls = variant({
	slots: [
		"base",
	],
	variants: {
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
	rule: [
		match(undefined, {
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
		match(
			{
				active: true,
			},
			{
				base: classes([
					"shadow-md",
				]),
			},
		),
		match(
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
		match(
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
		match(
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
		match(
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
		match(
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
		match(
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
		match(
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
		match(
			{
				borderless: true,
			},
			{
				base: classes([
					"border-none",
				]),
			},
		),
		match(
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
		match(
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
		match(
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
		match(
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
});

export namespace BadgeCls {
	export type Props<P = unknown> = Component<typeof BadgeCls, P>;
}
