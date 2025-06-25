import { cls } from "@use-pico/common";

export const TableCls = cls({
	slot: {
		base: [
			"min-w-full",
			"flex",
			"flex-col",
			"gap-2",
			"text-sm",
		],
		table: [
			"w-fit",
			"min-w-full",
		],
		thead: [
			"grid",
			"border",
			"border-(--table-thead-color-border)",
			"bg-(--table-thead-color-bg)",
		],
		th: [
			"flex",
			"flex-row",
			"items-center",
			"gap-2",
			"text-left",
			"px-2",
			"py-1",
			"border-t",
			"border-b",
			"border-(--table-th-color-border)",
			"truncate",
		],
		tr: [
			"grid",
			"border-b",
			"border-b-(--table-tr-color-border)",
			"bg-(--table-tr-color-bg)",
			"odd:bg-(--table-tr-odd-color-bg)",
			"hover:bg-(--table-tr-hover-color-bg)",
			"hover:border-(--table-tr-hover-color-border)",
		],
		td: [
			"flex",
			"flex-row",
			"items-center",
			"gap-2",
			"justify-between",
			"px-2",
			"py-1",
			"truncate",
			"group",
		],
		tfoot: [],
		select: [
			"cursor-pointer",
			"text-(--table-select-color-text)",
			"hover:text-(--table-select-color-hover-text)",
		],
	},
	variant: {
		selected: {
			true: [],
		},
	},
	match: [
		{
			if: {
				selected: true,
			},
			do: {
				tr: [
					"bg-(--table-tr-selected-color-bg)",
					"odd:bg-(--table-tr-selected-odd-color-bg)",
					"border-(--table-tr-selected-color-border)",
				],
				select: [
					"text-(--table-tr-selected-select-color-text)",
				],
			},
		},
	],
	defaults: {
		selected: false,
	},
});

export type TableCls = typeof TableCls;

export namespace TableCls {
	export type Props<P = unknown> = cls.Props<TableCls, P>;

	export type Slots = cls.Slots<TableCls>;
}
