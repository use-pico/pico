import { cls } from "@use-pico/cls";

export const PagesCls = cls({
	slot: {
		base: [
			"select-none",
		],
		list: [
			"flex",
			"items-center",
			"-space-x-px",
			"text-xs",
			"gap-2",
		],
		page: [
			"flex",
			"items-center",
			"justify-center",
			"w-12",
			"px-2",
			"py-1",
			"rounded-sm",
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
			do: {
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
export type PagesCls = typeof PagesCls;

export namespace PagesCls {
	export type Props<P = unknown> = cls.Props<PagesCls, P>;

	export type Slots = cls.Slots<PagesCls>;
}
