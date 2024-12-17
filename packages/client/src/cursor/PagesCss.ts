import { css } from "@use-pico/common";

export const PagesCss = css({
	slot: {
		base: ["select-none"],
		list: ["flex", "items-center", "-space-x-px", "text-xs", "gap-2"],
		page: [
			"flex",
			"items-center",
			"justify-center",
			"w-12",
			"px-2",
			"py-1",
			"rounded",
			"border",
			"border-slate-200",
			"hover:bg-slate-200",
			"cursor-pointer",
			"transition-all",
			"duration-200",
		],
	},
	variant: {
		current: {
			true: [],
		},
	},
	match: [
		{
			if: {
				current: true,
			},
			then: {
				page: [
					"bg-slate-100",
					"hover:bg-slate-200",
					"text-slate-800",
					"font-bold",
				],
			},
		},
	],
	defaults: {
		current: false,
	},
});

export namespace PagesCss {
	export type Props<P = unknown> = css.Props<typeof PagesCss, P>;
}
