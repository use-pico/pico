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
						"px-2",
						"py-1",
						"transition-all",
						"duration-300",
						"hover:scale-105",
					],
					[
						"round.default",
						"tone.subtle.light.bg:hover",
						"tone.subtle.light.shadow",
						"tone.subtle.light.shadow:hover",
						"shadow.md",
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
