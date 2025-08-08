import { type Component, variant } from "@use-pico/cls";

export const DetailCls = variant({
	slots: [
		"base",
		"section",
		"legend",
		"item",
		"value",
		"label",
		"field",
	],
	variants: {
		borderless: [
			"bool",
		],
	},
	rules: [
		{
			slot: {
				base: {
					class: [
						"flex",
						"flex-col",
						"gap-4",
					],
				},
				section: {
					class: [
						"flex",
						"flex-col",
						"gap-4",
						"border",
						"border-(--detail-section-color-border)",
						"rounded-sm",
						"bg-(--detail-section-color-bg)",
						"p-4",
					],
				},
				legend: {
					class: [
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"px-2",
					],
				},
				item: {
					class: [
						"flex",
						"flex-row",
						"gap-4",
						"items-center",
					],
				},
				value: {
					class: [
						"flex-1",
						"flex-col",
						"gap-2",
						"border",
						"border-(--detail-value-color-border)",
						"rounded-sm",
						"p-2",
					],
				},
				label: {
					class: [
						"font-bold",
						"text-(--detail-label-color-text)",
						"text-sm",
						"pb-1",
					],
				},
				field: {
					class: [
						"text-lg",
						"hover:bg-(--detail-field-color-hover-bg)",
						"rounded-sm",
						"px-2",
						"py-1",
					],
				},
			},
		},
		{
			match: {
				borderless: true,
			},
			slot: {
				value: {
					class: [
						"border-none",
					],
				},
			},
		},
	],
	defaults: {
		borderless: true,
	},
});
export type DetailCls = typeof DetailCls;

export namespace DetailCls {
	export type Props<P = unknown> = Component<DetailCls, P>;
}
