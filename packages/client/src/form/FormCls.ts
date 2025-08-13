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
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"border",
					"border-gray-300",
					"rounded-md",
					"p-4",
					"flex",
					"flex-col",
					"gap-2",
					"items-center",
				]),
				fieldset: what.css([
					"flex",
					"flex-col",
					"gap-4",
					"w-full",
					"p-4",
				]),
				legend: what.css([
					"font-bold",
					"text-lg",
					"p-1",
					"border-b",
					"border-slate-400",
					"w-full",
				]),
				input: what.css([
					"w-full",
					"border",
					"border-gray-300",
					"rounded-md",
					"p-2",
					"focus:outline-hidden",
					"focus:ring-2",
					"focus:ring-blue-500",
					"focus:border-transparent",
				]),
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
		],
		defaults: def.defaults({
			isSubmitting: false,
		}),
	}),
);
export type FormCls = typeof FormCls;

export namespace FormCls {
	export type Props<P = unknown> = Component<FormCls, P>;
}
