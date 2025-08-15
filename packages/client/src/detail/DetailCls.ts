import type { Component, ComponentSlots } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DetailCls = PicoCls.extend(
	{
		tokens: [],
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
				base: what.both(
					[
						"flex",
						"flex-col",
						"gap-4",
					],
					[
						"tone.neutral.light.shadow",
						"shadow.sm",
					],
				),
				section: what.both(
					[
						"flex",
						"flex-col",
						"gap-4",
						"border",
						"p-4",
					],
					[
						"tone.neutral.light.border",
						"tone.neutral.light.bg",
						"round.sm",
					],
				),
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
				value: what.both(
					[
						"flex-1",
						"flex-col",
						"gap-2",
						"border",
						"p-2",
					],
					[
						"tone.neutral.light.border",
						"round.sm",
					],
				),
				label: what.both(
					[
						"font-bold",
						"text-sm",
						"pb-1",
					],
					[
						"tone.neutral.light.text",
					],
				),
				field: what.both(
					[
						"text-lg",
						"rounded-sm",
						"px-2",
						"py-1",
					],
					[
						"tone.neutral.light.bg:hover",
					],
				),
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
