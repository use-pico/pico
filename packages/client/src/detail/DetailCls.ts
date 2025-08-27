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
				base: what.css([
					"flex",
					"flex-col",
					"gap-4",
				]),
				section: what.both(
					[
						"flex",
						"flex-col",
						"gap-4",
						"p-4",
						"border",
					],
					[
						"border.default",
						"tone.neutral.light.border",
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
				item: what.both(
					[
						"flex",
						"flex-row",
						"gap-4",
						"items-center",
					],
					[
						"tone.danger.dark.shadow",
					],
				),
				value: what.both(
					[
						"flex-1",
						"flex-col",
						"gap-2",
						"p-2",
					],
					[
						"border.default",
						"tone.neutral.light.border",
						"round.default",
					],
				),
				label: what.both(
					[
						"font-bold",
						"text-sm",
						"pb-1",
						"opacity-50",
					],
					[
						"tone.neutral.light.text",
					],
				),
				field: what.both(
					[
						"text-lg",
						"px-3",
						"py-1.5",
						"transition-all",
						"duration-300",
					],
					[
						"border.default",
						"shadow.default",
						"round.default",
						"tone.neutral.light.border",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
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
