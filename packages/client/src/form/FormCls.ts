import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"fieldset",
			"legend",
		],
		variant: {
			isError: [
				"bool",
			],
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
			}),
			def.rule(
				what.variant({
					isError: true,
				}),
				{
					legend: what.token([
						"tone.danger.light.border",
					]),
				},
			),
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
					isError: false,
					required: true,
				}),
				{
					legend: what.token([
						"tone.secondary.light.border",
					]),
				},
			),
		],
		defaults: def.defaults({
			isError: false,
			isSubmitting: false,
			required: false,
		}),
	}),
);
export type FormCls = typeof FormCls;

export namespace FormCls {
	export type Props<P = unknown> = Cls.Props<FormCls, P>;
}
