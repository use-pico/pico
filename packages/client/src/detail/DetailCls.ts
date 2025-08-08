import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DetailCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"section",
			"legend",
			"item",
			"value",
			"label",
			"field",
		],
		variant: {
			borderless: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule, classes }) => [
			root({
				base: classes([
					"flex",
					"flex-col",
					"gap-4",
				]),
				section: classes([
					"flex",
					"flex-col",
					"gap-4",
					"border",
					"border-(--detail-section-color-border)",
					"rounded-sm",
					"bg-(--detail-section-color-bg)",
					"p-4",
				]),
				legend: classes([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"px-2",
				]),
				item: classes([
					"flex",
					"flex-row",
					"gap-4",
					"items-center",
				]),
				value: classes([
					"flex-1",
					"flex-col",
					"gap-2",
					"border",
					"border-(--detail-value-color-border)",
					"rounded-sm",
					"p-2",
				]),
				label: classes([
					"font-bold",
					"text-(--detail-label-color-text)",
					"text-sm",
					"pb-1",
				]),
				field: classes([
					"text-lg",
					"hover:bg-(--detail-field-color-hover-bg)",
					"rounded-sm",
					"px-2",
					"py-1",
				]),
			}),
			rule(
				{
					borderless: true,
				},
				{
					value: classes([
						"border-none",
					]),
				},
			),
		],
		defaults: {
			borderless: true,
		},
	},
);

export type DetailCls = typeof DetailCls;

export namespace DetailCls {
	export type Props<P = unknown> = Component<DetailCls, P>;
}
