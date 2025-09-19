import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { AbstractListCls } from "../list/AbstractListCls";

export const TableCls = contract(AbstractListCls.contract)
	.slots([
		"root",
		"body",
		"items",
		"header",
		"headerCell",
		"row",
		"cell",
		"footer",
		"select",
	])
	.bool("selected")
	.def()
	.root({
		root: {
			class: [
				"Table-root",
				"min-w-full",
				"flex",
				"flex-col",
				"gap-2",
			],
		},
		body: {
			class: [
				"Table-body",
				"overflow-x-auto",
			],
		},
		items: {
			class: [
				"Table-items",
				"relative",
				"w-fit",
				"min-w-full",
			],
		},
		header: {
			class: [
				"Table-header",
				"grid",
				"border-t",
				"border-b",
				"font-medium",
				"px-2",
			],
			token: [
				"tone.neutral.light.text",
				"tone.neutral.light.bg",
				"tone.neutral.light.border",
			],
		},
		headerCell: {
			class: [
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
			],
		},
		row: {
			class: [
				"Table-row",
				"grid",
				"border-b",
				"transition-all",
				"duration-150",
				"hover:scale-99",
				"px-2",
				"hover:shadow-sm",
			],
			token: [
				"tone.neutral.light.border",
				"tone.neutral.light.bg:even",
				"tone.neutral.light.bg:odd",
				"tone.neutral.light.bg:hover",
				"tone.neutral.light.border:hover",
				"tone.neutral.light.shadow",
				"tone.neutral.light.shadow:hover",
			],
		},
		cell: {
			class: [
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
			],
		},
		footer: {
			class: [
				"Table-footer",
			],
		},
		select: {
			class: [
				"Table-select",
				"cursor-pointer",
				"transition-colors",
				"duration-150",
			],
			token: [
				"tone.neutral.dark.bg",
				"tone.neutral.dark.bg:hover",
			],
		},
	})
	// Selected state
	.match("selected", true, {
		row: {
			class: [
				"hover:shadow-sm",
			],
			token: [
				"tone.secondary.light.text",
				"tone.secondary.light.bg:even",
				"tone.secondary.light.bg:odd",
				"tone.secondary.light.bg:hover",
				"tone.secondary.light.border",
				"tone.secondary.light.border:hover",
				"tone.secondary.light.shadow",
				"tone.secondary.light.shadow:hover",
			],
		},
		select: {
			token: [
				"tone.secondary.dark.text",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		selected: false,
	})
	.cls();

export type TableCls = typeof TableCls;

export namespace TableCls {
	export type Props<P = unknown> = Cls.Props<TableCls, P>;

	export type Slots = Cls.SlotsOf<TableCls>;
}
