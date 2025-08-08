import { type Component, classes, match, variant } from "@use-pico/cls";

export const PagesCls = variant({
	slots: [
		"base",
		"list",
		"page",
	],
	variants: {
		current: [
			"bool",
		],
	},
	rule: [
		match(undefined, {
			base: classes([
				"select-none",
			]),
			list: classes([
				"flex",
				"items-center",
				"-space-x-px",
				"text-xs",
				"gap-2",
			]),
			page: classes([
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
			]),
		}),
		match(
			{
				current: true,
			},
			{
				page: classes([
					"bg-slate-100",
					"hover:bg-slate-200",
					"text-slate-800",
					"font-bold",
				]),
			},
		),
	],
	defaults: {
		current: false,
	},
});
export type PagesCls = typeof PagesCls;

export namespace PagesCls {
	export type Props<P = unknown> = Component<typeof PagesCls, P>;
}
