import type { Component, ComponentSlots } from "@use-pico/cls";
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
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"flex-col",
					"gap-4",
				]),
				section: what.css([
					"flex",
					"flex-col",
					"gap-4",
					"border",
					"border-(--detail-section-color-border)",
					"rounded-sm",
					"bg-(--detail-section-color-bg)",
					"p-4",
				]),
				legend: what.css([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"px-2",
				]),
				item: what.css([
					"flex",
					"flex-row",
					"gap-4",
					"items-center",
				]),
				value: what.css([
					"flex-1",
					"flex-col",
					"gap-2",
					"border",
					"border-(--detail-value-color-border)",
					"rounded-sm",
					"p-2",
				]),
				label: what.css([
					"font-bold",
					"text-(--detail-label-color-text)",
					"text-sm",
					"pb-1",
				]),
				field: what.css([
					"text-lg",
					"hover:bg-(--detail-field-color-hover-bg)",
					"rounded-sm",
					"px-2",
					"py-1",
				]),
			}),
			def.rule(
				what.variant({
					borderless: true,
				}),
				{
					value: what.css([
						"border-none",
					]),
				},
			),
		],
		defaults: def.defaults({
			borderless: true,
		}),
	}),
);

export type DetailCls = typeof DetailCls;

export namespace DetailCls {
	export type Props<P = unknown> = Component<DetailCls, P>;

	export type Slots = ComponentSlots<DetailCls>;
}
