import type { Component, ComponentSlots } from "@use-pico/cls";
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
						"font-medium",
					],
					[
						"tone.neutral.light.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
					],
				),
				headerCell: what.css([
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
						"grid",
						"border-b",
						"transition-all",
						"duration-150",
						"hover:scale-99",
					],
					[
						"tone.neutral.light.border",
						"tone.neutral.light.bg:even",
						"tone.neutral.light.bg:odd",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.border:hover",
					],
				),
				cell: what.css([
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
				footer: what.css([]),
				select: what.both(
					[
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
					row: what.token([
						"tone.secondary.light.text",
						"tone.secondary.light.bg:even",
						"tone.secondary.light.bg:odd",
						"tone.secondary.light.bg:hover",
						"tone.secondary.light.border",
						"tone.secondary.light.border:hover",
					]),
					select: what.token([
						"tone.secondary.dark.text",
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
