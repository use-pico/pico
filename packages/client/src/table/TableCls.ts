import type { Component, ComponentSlots } from "@use-pico/cls";
import { AbstractListCls } from "../list/AbstractListCls";

export const TableCls = AbstractListCls.extend(
	{
		tokens: {},
		slot: [
			"root",
			"body",
			"items",
			"header",
			"headerCell",
			"row",
			"cell",
			"footer",
			"select",
		],
		variant: {
			selected: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"min-w-full",
					"flex",
					"flex-col",
					"gap-2",
					"text-sm",
				]),
				body: what.css([
					"overflow-x-auto",
				]),
				items: what.css([
					"relative",
					"w-fit",
					"min-w-full",
				]),
				header: what.both(
					[
						"grid",
						"border-t",
						"border-b",
					],
					[
						"subtle.color.text-dark",
						"subtle.color.bg-light",
						"subtle.color.border-dark",
					],
				),
				headerCell: what.css([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-2",
					"text-left",
					"px-2",
					"py-1",
					"truncate",
				]),
				row: what.both(
					[
						"grid",
						"border-b",
					],
					[
						// "subtle.color.bg-light-odd",
						"subtle.color.border-dark",
						"secondary.color.bg-light-hover",
						"secondary.color.border-dark-hover",
						// "neutral.color.border-light",
						// "neutral.color.bg-light-hover",
						// "neutral.color.border-light-hover",
						// "neutral.color.bg-light-odd",
						// "neutral.color.bg-light-odd-hover",
						// "neutral.color.border-light-odd",
						// "neutral.color.border-light-odd-hover",
					],
				),
				cell: what.css([
					"flex",
					"flex-row",
					"items-center",
					"gap-2",
					"justify-between",
					"px-2",
					"py-1",
					"truncate",
					"group",
				]),
				footer: what.css([]),
				select: what.both(
					[
						"cursor-pointer",
					],
					[
						"secondary.color.text-dark",
						"secondary.color.text-dark-hover",
					],
				),
			}),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					row: what.token([
						"subtle.color.bg-dark",
						"subtle.color.bg-dark-odd",
						"subtle.color.border-dark",
						"subtle.color.border-dark-odd",
						// "subtle.color.bg-dark-hover",
						// "subtle.color.border-dark-hover",
					]),
					select: what.token([
						"secondary.color.text-dark",
					]),
				},
			),
		],
		defaults: def.defaults({
			selected: false,
		}),
	}),
);

export type TableCls = typeof TableCls;

export namespace TableCls {
	export type Props<P = unknown> = Component<TableCls, P>;

	export type Slots = ComponentSlots<TableCls>;
}
