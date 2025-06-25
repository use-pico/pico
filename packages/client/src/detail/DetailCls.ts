import { cls } from "@use-pico/common";

export const DetailCls = cls({
	slot: {
		/**
		 * Base detail styles (the wrapper).
		 */
		base: [
			"flex",
			"flex-col",
			"gap-4",
		],
		/**
		 * Style of one section of a detail.
		 */
		section: [
			"flex",
			"flex-col",
			"gap-4",
			"border",
			"border-(--detail-section-color-border)",
			"rounded-sm",
			"bg-(--detail-section-color-bg)",
			"p-4",
		],
		/**
		 * Style of the section title (literally legend tag).
		 */
		legend: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"px-2",
		],
		/**
		 * Item holding multiple values.
		 */
		item: [
			"flex",
			"flex-row",
			"gap-4",
			"items-center",
		],
		/**
		 * Value wrapper (label+field).
		 */
		value: [
			"flex-1",
			"flex-col",
			"gap-2",
			"border",
			"border-(--detail-value-color-border)",
			"rounded-sm",
			"p-2",
		],
		/**
		 * Value label styles.
		 */
		label: [
			"font-bold",
			"text-(--detail-label-color-text)",
			"text-sm",
			"pb-1",
		],
		/**
		 * Field holding the final value.
		 */
		field: [
			"text-lg",
			"hover:bg-(--detail-field-color-hover-bg)",
			"rounded-sm",
			"px-2",
			"py-1",
		],
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
			do: {
				value: [
					"border-none",
				],
			},
		},
	],
	defaults: {
		borderless: true,
	},
});
export type DetailCls = typeof DetailCls;

export namespace DetailCls {
	export type Props<P = unknown> = cls.Props<DetailCls, P>;

	export type Slots = cls.Slots<DetailCls>;
}
