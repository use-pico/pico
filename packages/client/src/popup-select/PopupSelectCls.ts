import type { Component, ComponentSlots } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PopupSelectCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"input",
			"content",
		],
		variant: {
			loading: [
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
					"flex",
					"flex-col",
					"gap-2",
				]),
				input: what.css([
					"py-2",
					"px-2",
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"cursor-pointer",
					"hover:bg-slate-50",
					"border",
					"border-gray-300",
					"rounded-md",
					"text-slate-400",
					"hover:text-slate-700",
					"focus:outline-hidden",
					"focus:ring-2",
					"focus:ring-blue-500",
					"focus:border-transparent",
				]),
			}),
			def.rule(
				what.variant({
					loading: true,
				}),
				{
					input: what.css([
						"text-slate-300",
						"cursor-progress",
					]),
				},
			),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					input: what.css([
						"bg-slate-50",
						"text-slate-700",
						"hover:bg-slate-100",
						"hover:text-slate-800",
					]),
				},
			),
		],
		defaults: def.defaults({
			loading: false,
			selected: false,
		}),
	}),
);

export type PopupSelectCls = typeof PopupSelectCls;

export namespace PopupSelectCls {
	export type Props<P = unknown> = Component<PopupSelectCls, P>;

	export type Slots = ComponentSlots<PopupSelectCls>;
}
