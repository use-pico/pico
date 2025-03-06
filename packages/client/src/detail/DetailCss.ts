import { css } from "@use-pico/common";

export const DetailCss = css({
	slot: {
		/**
		 * Base detail styles (the wrapper).
		 */
		base: ["flex", "flex-col", "gap-4"],
		/**
		 * Style of one section of a detail.
		 */
		section: [
			"flex",
			"flex-col",
			"gap-4",
			"border",
			"border-slate-300",
			"rounded-sm",
			"p-4",
		],
		/**
		 * Style of the section title (literally legend tag).
		 */
		legend: ["flex", "flex-row", "gap-2", "items-center", "px-2"],
		/**
		 * Item holding multiple values.
		 */
		item: ["flex", "flex-row", "gap-4", "items-center"],
		/**
		 * Value wrapper (label+field).
		 */
		value: [
			"flex-1",
			"flex-col",
			"gap-2",
			"border",
			"border-slate-200",
			"rounded-sm",
			"p-2",
		],
		/**
		 * Value label styles.
		 */
		label: ["font-bold", "text-slate-500", "text-sm", "pb-1"],
		/**
		 * Field holding the final value.
		 */
		field: ["text-lg", "hover:bg-slate-100", "rounded-sm", "px-2", "py-1"],
	},
	variant: {
		borderless: {
			true: [],
		},
	},
	match: [
		{
			if: {
				borderless: true,
			},
			then: {
				value: ["border-none"],
			},
		},
	],
	defaults: {
		borderless: true,
	},
});

export namespace DetailCss {
	export type Props<P = unknown> = css.Props<typeof DetailCss, P>;
}
