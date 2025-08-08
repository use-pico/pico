import { type Component, classes, match, variant } from "@use-pico/cls";

export const AlertCls = variant({
	slots: [
		"base",
		"title",
		"message",
		"body",
	],
	variants: {
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
	rules: [
		match(undefined, {
			base: classes([
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
			title: classes([
				"font-semibold",
				"w-full",
			]),
			message: classes([
				"opacity-85",
				"text-sm",
				"w-full",
			]),
			body: classes([
				"border-t",
				"w-full",
				"border-(--pico-color-border-default)",
			]),
		}),
		match(
			{
				variant: "info",
				clickable: true,
			},
			{
				base: classes([
					"hover:bg-(--color-info-clickable-hover-bg)",
				]),
			},
		),
		match(
			{
				variant: "success",
				clickable: true,
			},
			{
				base: classes([
					"hover:bg-(--color-success-clickable-hover-bg)",
				]),
			},
		),
		match(
			{
				variant: "warning",
				clickable: true,
			},
			{
				base: classes([
					"hover:bg-(--color-warning-clickable-hover-bg)",
				]),
			},
		),
		match(
			{
				variant: "error",
				clickable: true,
			},
			{
				base: classes([
					"hover:bg-(--color-error-clickable-hover-bg)",
				]),
			},
		),
		match(
			{
				variant: "neutral",
				clickable: true,
			},
			{
				base: classes([
					"hover:bg-(--color-neutral-clickable-hover-bg)",
				]),
			},
		),
		match(
			{
				variant: "subtle",
				clickable: true,
			},
			{
				base: classes([
					"hover:bg-(--color-subtle-clickable-hover-bg)",
				]),
			},
		),
	],
	defaults: {
		clickable: false,
		variant: "info",
	},
});

export namespace AlertCls {
	export type Props<P = unknown> = Component<typeof AlertCls, P>;
}
