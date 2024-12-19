import { css } from "@use-pico/common";

export const ActionCss = css({
	slot: {
		base: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"rounded",
			"px-2",
			"py-1",
			"hover:bg-slate-100",
			"text-slate-500",
			"hover:text-blue-500",
			"cursor-pointer",
		],
	},
	variant: {},
	defaults: {},
});
