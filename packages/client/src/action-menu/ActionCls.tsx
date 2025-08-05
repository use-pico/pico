import { cls } from "@use-pico/cls";

export const ActionCls = cls({
	slot: {
		base: [
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
		],
	},
	variant: {
		variant: {
			common: [
				"pico--action-menu-item-common",
			],
			warning: [
				"pico--action-menu-item-warning",
			],
			danger: [
				"pico--action-menu-item-danger",
			],
		},
		disabled: {
			true: [
				"cursor-not-allowed",
				"hover:text-(--pico-text-default)",
				"hover:bg-(--pico-bg-default)",
			],
		},
	},
	defaults: {
		variant: "common",
		disabled: false,
	},
});
