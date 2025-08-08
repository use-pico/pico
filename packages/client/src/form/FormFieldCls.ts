import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormFieldCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"input",
		],
		variant: {
			required: [
				"bool",
			],
			disabled: [
				"bool",
			],
			isSubmitting: [
				"bool",
			],
			isLoading: [
				"bool",
			],
			isError: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule }) => [
			root({
				base: {
					class: [
						"flex",
						"flex-col",
						"gap-1",
						"w-full",
					],
				},
			}),
			rule(
				{
					isError: true,
				},
				{
					base: {
						class: [
							"text-(--input-error-color-text)",
						],
					},
				},
			),
			rule(
				{
					required: true,
				},
				{
					base: {
						class: [
							"text-(--input-required-color-text)",
							"font-bold",
						],
					},
				},
			),
			rule(
				{
					disabled: true,
				},
				{
					base: {
						class: [
							"opacity-75",
							"cursor-not-allowed",
						],
					},
					input: {
						class: [
							"pointer-events-none",
						],
					},
				},
			),
		],
		defaults: {
			required: false,
			disabled: false,
			isSubmitting: false,
			isLoading: false,
			isError: false,
		},
	},
);

export type FormFieldCls = typeof FormFieldCls;

export namespace FormFieldCls {
	export type Props<P = unknown> = Component<FormFieldCls, P>;
}
