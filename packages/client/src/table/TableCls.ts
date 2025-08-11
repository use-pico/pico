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
				header: what.css([
					"grid",
					"border-t",
					"border-b",
					"border-(--table-th-color-border)",
					"bg-(--table-thead-color-bg)",
				]),
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
				row: what.css([
					"grid",
					"border-b",
					"border-b-(--table-tr-color-border)",
					"bg-(--table-tr-color-bg)",
					"odd:bg-(--table-tr-odd-color-bg)",
					"hover:bg-(--table-tr-hover-color-bg)",
					"hover:border-(--table-tr-hover-color-border)",
				]),
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
				select: what.css([
					"cursor-pointer",
					"text-(--table-select-color-text)",
					"hover:text-(--table-select-color-hover-text)",
				]),
			}),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					row: what.css([
						"bg-(--table-tr-selected-color-bg)",
						"odd:bg-(--table-tr-selected-odd-color-bg)",
						"border-(--table-tr-selected-color-border)",
					]),
					select: what.css([
						"text-(--table-tr-selected-select-color-text)",
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
