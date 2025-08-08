import { PicoCls } from "../cls/PicoCls";

export const ActionCls = PicoCls.variant({
	slots: [
		"base",
	],
	variants: {
		variant: [
			"common",
			"warning",
			"danger",
		],
		disabled: [
			"bool",
		],
	},
	rules: ({ root, rule, classes }) => [
		root({
			base: classes([
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
				"rounded-sm",
				"px-2",
				"py-0.5",
				"cursor-pointer",
				"text-(--pico-text-default)",
				"hover:bg-(--pico-bg-hover)",
				"hover:text-(--pico-text-hover)",
			]),
		}),
		rule(
			{
				variant: "common",
			},
			{
				base: classes([
					"pico--action-menu-item-common",
				]),
			},
		),
		rule(
			{
				variant: "warning",
			},
			{
				base: classes([
					"pico--action-menu-item-warning",
				]),
			},
		),
		rule(
			{
				variant: "danger",
			},
			{
				base: classes([
					"pico--action-menu-item-danger",
				]),
			},
		),
		rule(
			{
				disabled: true,
			},
			{
				base: classes([
					"cursor-not-allowed",
					"hover:text-(--pico-text-default)",
					"hover:bg-(--pico-bg-default)",
				]),
			},
		),
	],
	defaults: {
		variant: "common",
		disabled: false,
	},
});
