import { classes, variant } from "@use-pico/cls";

export const ActionCls = variant({
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
	rules: [
		{
			slot: {
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
			},
		},
		{
			match: {
				variant: "common",
			},
			slot: {
				base: classes([
					"pico--action-menu-item-common",
				]),
			},
		},
		{
			match: {
				variant: "warning",
			},
			slot: {
				base: classes([
					"pico--action-menu-item-warning",
				]),
			},
		},
		{
			match: {
				variant: "danger",
			},
			slot: {
				base: classes([
					"pico--action-menu-item-danger",
				]),
			},
		},
		{
			match: {
				disabled: true,
			},
			slot: {
				base: classes([
					"cursor-not-allowed",
					"hover:text-(--pico-text-default)",
					"hover:bg-(--pico-bg-default)",
				]),
			},
		},
	],
	defaults: {
		variant: "common",
		disabled: false,
	},
});
