import { cls } from "@use-pico/common";

export const TabCls = cls({
	slot: {
		base: [
			"flex",
			"flex-row",
			"items-center",
			"gap-1",
			"cursor-pointer",
			"text-slate-600",
			"border-sky-400",
			"border",
			"border-b-2",
			"border-transparent",
			"hover:border-b-sky-400",
			"py-1",
			"px-2",
			"rounded",
		],
	},
	variant: {
		active: {
			true: [],
		},
	},
	match: [
		{
			if: {
				active: true,
			},
			do: {
				base: [
					"cursor-default",
					"font-semibold",
					"text-slate-800",
					"border-sky-400",
					"bg-sky-50",
				],
			},
		},
	],
	defaults: {
		active: false,
	},
});
export type TabCls = typeof TabCls;

export namespace TabCls {
	export type Props<P = unknown> = cls.Props<TabCls, P>;

	export type Slots = cls.Slots<TabCls>;
}
