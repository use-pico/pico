import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const SelectCls = PicoCls.extend(
	{
		tokens: [],
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
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
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
				input: what.css([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-2",
				]),
				popup: what.css([
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
				item: what.css([
					"focus:outline-hidden",
					"py-2",
					"px-2.5",
					"flex",
					"items-center",
					"justify-between",
				]),
			}),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"cursor-not-allowed",
						"hover:shadow-none",
						"focus:border-slate-300",
						"opacity-50",
					]),
				},
			),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					item: what.css([
						"bg-slate-100",
					]),
				},
			),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					item: what.css([
						"bg-slate-200",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
			selected: false,
			active: false,
		}),
	}),
);

export type SelectCls = typeof SelectCls;

export namespace SelectCls {
	export type Props<P = unknown> = Component<SelectCls, P>;
}
