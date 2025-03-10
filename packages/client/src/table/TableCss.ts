import { css } from "@use-pico/common";

export const TableCss = css({
	slot: {
		base: ["min-w-full", "flex", "flex-col", "gap-2", "text-sm"],
		table: ["min-w-full", "w-max", "table-fixed"],
		thead: [
			"border",
			"border-(--table-thead-color-border)",
			"bg-(--table-thead-color-bg)",
		],
		th: [
			"text-left",
			"px-2",
			"py-1",
			"border-t",
			"border-b",
			"border-(--table-th-color-border)",
			"truncate",
		],
		tbody: [],
		tr: [
			"border-b",
			"border-b-(--table-tr-color-border)",
			"bg-(--table-tr-color-bg)",
			"odd:bg-(--table-tr-odd-color-bg)",
			"hover:bg-(--table-tr-hover-color-bg)",
			"hover:border-(--table-tr-hover-color-border)",
		],
		td: ["px-2", "py-1", "truncate"],
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
			then: {
				tr: [
					"bg-(--table-tr-selected-color-bg)",
					"odd:bg-(--table-tr-selected-odd-color-bg)",
					"border-(--table-tr-selected-color-border)",
				],
				select: ["text-(--table-tr-selected-select-color-text)"],
			},
		},
	],
	defaults: {
		selected: false,
	},
});

export namespace TableCss {
	export type Props<P = unknown> = css.Props<typeof TableCss, P>;
}
