import { type Component, classes, variant } from "@use-pico/cls";

export const TabCls = variant({
	slots: [
		"base",
	],
	variants: {
		active: [
			"bool",
		],
	},
	rule: [
		{
			slot: {
				base: classes([
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
				]),
			},
		},
		{
			match: {
				active: true,
			},
			slot: {
				base: classes([
					"cursor-default",
					"font-semibold",
					"text-slate-800",
					"border-sky-400",
					"bg-sky-50",
				]),
			},
		},
	],
	defaults: {
		active: false,
	},
});
export type TabCls = typeof TabCls;

export namespace TabCls {
	export type Props<P = unknown> = Component<TabCls, P>;
}
