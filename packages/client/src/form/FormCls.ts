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
						"flex",
						"flex-col",
						"gap-2",
						"items-center",
					],
					[
						"border.default",
						"round.default",
						"square.md",
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
						"transition-all",
						"duration-100",
					],
					[
						"square.md",
						"border.default",
						"round.default",
						"tone.neutral.light.border",
						"focus.off",
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
					legend: what.token([
						"tone.secondary.light.border",
					]),
					input: what.token([
						"tone.secondary.light.border",
					]),
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
