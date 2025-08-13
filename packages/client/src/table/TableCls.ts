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
					],
					[
						"tone.subtle.dark.text",
						"tone.subtle.light.bg",
						"tone.subtle.dark.border",
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
						// "tone.subtle.light.bg:odd",
						"tone.subtle.dark.border",
						"tone.secondary.light.bg:hover",
						"tone.secondary.dark.border:hover",
						// "tone.neutral.light.border",
						// "tone.neutral.light.bg:hover",
						// "tone.neutral.light.border:hover",
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
						"tone.secondary.dark.text",
						"tone.secondary.dark.text:hover",
					],
				),
			}),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					row: what.token([
						"tone.subtle.dark.bg",
						"tone.subtle.dark.bg:odd",
						"tone.subtle.dark.border",
						"tone.subtle.dark.border",
						// "tone.subtle.dark.bg:hover",
						// "tone.subtle.dark.border:hover",
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
