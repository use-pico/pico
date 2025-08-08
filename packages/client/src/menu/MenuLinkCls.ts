import { type Component, variant } from "@use-pico/cls";

export const MenuLinkCls = variant({
	slots: [
		"base",
	],
	variants: {
		active: [
			"bool",
		],
		inner: [
			"bool",
		],
		subtle: [
			"bool",
		],
		vertical: [
			"bool",
		],
	},
	rules: ({ root, rule, classes }) => [
		root({
			base: classes([
				"pico--menu-link",
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
				"rounded-sm",
				"px-2",
				"py-1",
				"border",
				"border-b-2",
				"border-transparent",
				"hover:text-(--color-text-hover)",
				"hover:bg-(--color-bg-hover)",
				"hover:border-(--color-border-hover)",
			]),
		}),
		rule(
			{
				active: true,
				inner: false,
			},
			{
				base: classes([
					"bg-(--color-active-bg)",
					"border-(--color-active-border)",
					"hover:border-(--color-active-border-hover)",
					"hover:text-(--color-active-text-hover)",
					"text-(--color-active-text)",
				]),
			},
		),
		rule(
			{
				active: true,
				inner: true,
			},
			{
				base: classes([
					"border-transparent",
					"bg-(--color-active-bg)",
					"hover:border-(--color-active-border-hover)",
					"hover:text-(--color-active-text-hover)",
					"text-(--color-active-text)",
				]),
			},
		),
		rule(
			{
				subtle: true,
			},
			{
				base: classes([
					"hover:bg-slate-50",
					"hover:border-slate-300",
					"hover:text-slate-600",
				]),
			},
		),
		rule(
			{
				active: true,
				subtle: true,
			},
			{
				base: classes([
					"bg-slate-100",
					"border-slate-400",
				]),
			},
		),
		rule(
			{
				vertical: true,
			},
			{
				base: classes([
					"w-full",
				]),
			},
		),
	],
	defaults: {
		active: false,
		inner: false,
		subtle: false,
		vertical: false,
	},
});

export namespace MenuLinkCls {
	export type Props<P = unknown> = Component<typeof MenuLinkCls, P>;
}
