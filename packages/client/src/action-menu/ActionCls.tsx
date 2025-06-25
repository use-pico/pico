import { cls } from "@use-pico/common";

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
			"hover:bg-slate-100",
			"text-slate-500",
			"hover:text-blue-500",
			"cursor-pointer",
		],
	},
	variant: {
		variant: {
			common: [],
			warning: [
				"text-amber-500",
				"hover:text-amber-600",
				"hover:bg-amber-100",
			],
			danger: [
				"text-red-500",
				"hover:text-red-600",
				"hover:bg-red-100",
			],
		},
		disabled: {
			true: [
				"cursor-not-allowed",
				"text-slate-300",
				"bg-slate-100",
				"hover:bg-slate-100",
			],
		},
	},
	defaults: {
		variant: "common",
		disabled: false,
	},
});
