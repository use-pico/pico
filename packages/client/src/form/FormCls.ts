import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"fieldset",
			"legend",
			"input",
		],
		variant: {
			isSubmitting: [
				"bool",
			],
			required: [
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
						"border",
						"rounded-md",
						"p-4",
						"flex",
						"flex-col",
						"gap-2",
						"items-center",
					],
					[
						"tone.neutral.light.border",
					],
				),
				fieldset: what.css([
					"flex",
					"flex-col",
					"gap-4",
					"w-full",
					"p-4",
				]),
				legend: what.both(
					[
						"font-bold",
						"text-lg",
						"p-1",
						"border-b",
						"w-full",
					],
					[
						"tone.neutral.light.border",
					],
				),
				input: what.both(
					[
						"w-full",
						"border",
						"rounded-md",
						"p-2",
						"focus:outline-hidden",
						"focus:ring-2",
						"focus:ring-blue-500",
						"focus:border-transparent",
						"hover:scale-105",
						"active:scale-105",
						"transition-all",
						"duration-100",
					],
					[
						"tone.neutral.light.border",
					],
				),
			}),
			def.rule(
				what.variant({
					isSubmitting: true,
				}),
				{
					base: what.css([
						"opacity-50",
						"pointer-events-none",
						"select-none",
					]),
				},
			),
			def.rule(
				what.variant({
					required: true,
				}),
				{
					legend: what.both(
						[
							"font-bold",
							"text-lg",
							"p-1",
							"border-b",
							"w-full",
						],
						[
							"tone.secondary.light.border",
						],
					),
					input: what.both(
						[
							"w-full",
							"border",
							"rounded-md",
							"p-2",
							"focus:outline-hidden",
							"focus:ring-2",
							"focus:ring-blue-500",
							"focus:border-transparent",
							"hover:scale-105",
							"active:scale-105",
							"transition-all",
							"duration-100",
						],
						[
							"tone.secondary.light.border",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			isSubmitting: false,
			required: false,
		}),
	}),
);
export type FormCls = typeof FormCls;

export namespace FormCls {
	export type Props<P = unknown> = Component<FormCls, P>;
}
