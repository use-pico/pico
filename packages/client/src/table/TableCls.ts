import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TableCls = PicoCls.extend(
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
	{
		token: {},
		rules: ({ root, rule, classes }) => [
			root({
				root: classes([
					"min-w-full",
					"flex",
					"flex-col",
					"gap-2",
					"text-sm",
				]),
				body: classes([
					"overflow-x-auto",
				]),
				items: classes([
					"relative",
					"w-fit",
					"min-w-full",
				]),
				header: classes([
					"grid",
					"border-t",
					"border-b",
					"border-(--table-th-color-border)",
					"bg-(--table-thead-color-bg)",
				]),
				headerCell: classes([
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
				row: classes([
					"grid",
					"border-b",
					"border-b-(--table-tr-color-border)",
					"bg-(--table-tr-color-bg)",
					"odd:bg-(--table-tr-odd-color-bg)",
					"hover:bg-(--table-tr-hover-color-bg)",
					"hover:border-(--table-tr-hover-color-border)",
				]),
				cell: classes([
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
				footer: classes([]),
				select: classes([
					"cursor-pointer",
					"text-(--table-select-color-text)",
					"hover:text-(--table-select-color-hover-text)",
				]),
			}),
			rule(
				{
					selected: true,
				},
				{
					row: classes([
						"bg-(--table-tr-selected-color-bg)",
						"odd:bg-(--table-tr-selected-odd-color-bg)",
						"border-(--table-tr-selected-color-border)",
					]),
					select: classes([
						"text-(--table-tr-selected-select-color-text)",
					]),
				},
			),
		],
		defaults: {
			selected: false,
		},
	},
);

export type TableCls = typeof TableCls;

export namespace TableCls {
	export type Props<P = unknown> = Component<TableCls, P>;
}
