import type { Cls } from "@use-pico/cls";
import { AbstractListCls } from "../list/AbstractListCls";

export const TableCls = AbstractListCls.extend(
	{
		tokens: [],
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
					"Table-root",
					"min-w-full",
					"flex",
					"flex-col",
					"gap-2",
				]),
				body: what.css([
					"Table-body",
					"overflow-x-auto",
				]),
				items: what.css([
					"Table-items",
					"relative",
					"w-fit",
					"min-w-full",
				]),
				header: what.both(
					[
						"Table-header",
						"grid",
						"border-t",
						"border-b",
						"font-medium",
						"px-2",
					],
					[
						"tone.neutral.light.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
					],
				),
				headerCell: what.css([
					"Table-headerCell",
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-2",
					"text-left",
					"px-3",
					"py-2",
					"truncate",
				]),
				row: what.both(
					[
						"Table-row",
						"grid",
						"border-b",
						"transition-all",
						"duration-150",
						"hover:scale-99",
						"px-2",
						"hover:shadow-sm",
					],
					[
						"tone.neutral.light.border",
						"tone.neutral.light.bg:even",
						"tone.neutral.light.bg:odd",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
					],
				),
				cell: what.css([
					"Table-cell",
					"flex",
					"flex-row",
					"items-center",
					"gap-2",
					"justify-between",
					"px-3",
					"py-2",
					"truncate",
					"group",
				]),
				footer: what.css([
					"Table-footer",
				]),
				select: what.both(
					[
						"Table-select",
						"cursor-pointer",
						"transition-colors",
						"duration-150",
					],
					[
						"tone.neutral.dark.bg",
						"tone.neutral.dark.bg:hover",
					],
				),
			}),
			// Selected state
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					row: what.both(
						[
							"hover:shadow-sm",
						],
						[
							"tone.secondary.light.text",
							"tone.secondary.light.bg:even",
							"tone.secondary.light.bg:odd",
							"tone.secondary.light.bg:hover",
							"tone.secondary.light.border",
							"tone.secondary.light.border:hover",
							"tone.secondary.light.shadow",
							"tone.secondary.light.shadow:hover",
						],
					),
					select: what.token([
						"tone.secondary.dark.text",
					]),
				},
			),
		],
		defaults: def.defaults({
			selected: false,
			tone: "unset",
			theme: "unset",
		}),
	}),
);

export type TableCls = typeof TableCls;

export namespace TableCls {
	export type Props<P = unknown> = Cls.Props<TableCls, P>;

	export type Slots = Cls.SlotsOf<TableCls>;
}
