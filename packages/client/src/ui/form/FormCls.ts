import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const FormCls = contract(PicoCls.contract)
	.slots([
		"root",
		"fieldset",
		"legend",
	])
	.bool("isError")
	.bool("isSubmitting")
	.bool("required")
	.def()
	.root({
		root: {
			class: [
				"Form-root",
				"flex",
				"flex-col",
				"gap-2",
				"items-center",
			],
			token: [
				"border.default",
				"round.default",
				"tone.neutral.light.border",
			],
		},
		fieldset: {
			class: [
				"Form-fieldset",
				"flex",
				"flex-col",
				"gap-4",
				"w-full",
				"p-4",
			],
		},
		legend: {
			class: [
				"Form-legend",
				"font-bold",
				"text-lg",
				"p-1",
				"border-b",
				"w-full",
			],
			token: [
				"tone.neutral.light.border",
			],
		},
	})
	.match("isError", true, {
		legend: {
			token: [
				"tone.danger.light.border",
			],
		},
	})
	.match("isSubmitting", true, {
		root: {
			class: [
				"opacity-50",
				"pointer-events-none",
				"select-none",
			],
		},
	})
	.rule(
		{
			isError: false,
			required: true,
		},
		{
			legend: {
				token: [
					"tone.secondary.light.border",
				],
			},
		},
	)
	.defaults({
		tone: "primary",
		theme: "light",
		isError: false,
		isSubmitting: false,
		required: false,
	})
	.cls();
export type FormCls = typeof FormCls;

export namespace FormCls {
	export type Props<P = unknown> = Cls.Props<FormCls, P>;
}
