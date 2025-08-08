import type { ClsSlots, Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const SelectCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"input",
			"popup",
			"item",
		],
		variant: {
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
	},
	{
		token: {},
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
	},
);

export type SelectCls = typeof SelectCls;

export namespace SelectCls {
	export type Props<P = unknown> = Component<SelectCls, P>;

	export type Slots = ClsSlots<SelectCls["contract"]>;
}
