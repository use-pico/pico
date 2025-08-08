import { type Component, variant } from "@use-pico/cls";

export const SelectCls = variant({
	slots: [
		"base",
		"input",
		"popup",
		"item",
	],
	variants: {
		disabled: [
			"bool",
		],
		active: [
			"bool",
		],
		selected: [
			"bool",
		],
	},
	rules: ({ root, rule, classes }) => [
		root({
			base: classes([
				"cursor-pointer",
				"bg-slate-50",
				"text-slate-900",
				"text-sm",
				"border",
				"border-slate-300",
				"rounded-sm",
				"focus:border-sky-400",
				"focus:outline-hidden",
				"p-2.5",
				"hover:shadow-md",
				"transition-all",
				"group",
			]),
			input: classes([
				"flex",
				"flex-row",
				"items-center",
				"justify-between",
				"gap-2",
			]),
			popup: classes([
				"z-50",
				"cursor-pointer",
				"overflow-y-auto",
				"rounded-sm",
				"border",
				"border-slate-300",
				"bg-white",
				"shadow-lg",
				"focus:outline-hidden",
			]),
			item: classes([
				"focus:outline-hidden",
				"py-2",
				"px-2.5",
				"flex",
				"items-center",
				"justify-between",
			]),
		}),
		rule(
			{
				disabled: true,
			},
			{
				base: classes([
					"cursor-not-allowed",
					"hover:shadow-none",
					"focus:border-slate-300",
					"opacity-50",
				]),
			},
		),
		rule(
			{
				selected: true,
			},
			{
				item: classes([
					"bg-slate-100",
				]),
			},
		),
		rule(
			{
				active: true,
			},
			{
				item: classes([
					"bg-slate-200",
				]),
			},
		),
	],
	defaults: {
		disabled: false,
		selected: false,
		active: false,
	},
});

export namespace SelectCls {
	export type Props<P = unknown> = Component<typeof SelectCls, P>;
}
