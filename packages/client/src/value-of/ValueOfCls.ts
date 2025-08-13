import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ValueOfCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"label",
			"value",
		],
		variant: {
			inline: [
				"bool",
			],
			withBackground: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"pico--value-of",
					"border",
					"border-(--color-border)",
					"px-2",
					"py-1",
					"rounded-md",
					"group",
				]),
				label: what.css([
					"text-sm",
					"font-semibold",
					"text-(--label-color-text)",
					"border-b",
					"border-(--label-color-border)",
					"group-hover:border-(--label-color-hover-border)",
					"mb-2",
				]),
				value: what.css([]),
			}),
			def.rule(
				what.variant({
					inline: true,
				}),
				{
					base: what.css([
						"border-none",
						"flex",
						"flex-row",
						"items-center",
						"gap-2",
					]),
					label: what.css([
						"mb-0",
						"font-light",
						"text-md",
						"text-(--inline-label-color-text)",
						"border-none",
					]),
					value: what.css([
						"text-md",
						"text-(--inline-value-color-text)",
					]),
				},
			),
			def.rule(
				what.variant({
					withBackground: true,
				}),
				{
					base: what.css([
						"bg-(--color-bg)",
						"hover:bg-(--color-hover-bg)",
						"hover:border-(--color-hover-border)",
					]),
				},
			),
		],
		defaults: def.defaults({
			inline: false,
			withBackground: true,
		}),
	}),
);

export type ValueOfCls = typeof ValueOfCls;

export namespace ValueOfCls {
	export type Props<P = unknown> = Component<typeof ValueOfCls, P>;
}
