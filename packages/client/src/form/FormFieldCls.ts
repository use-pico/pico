import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormFieldCls = PicoCls.extend(
	{
		tokens: [],
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
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"flex-col",
					"gap-1",
					"w-full",
				]),
			}),
			def.rule(
				what.variant({
					isError: true,
				}),
				{
					base: what.css([
						"text-(--input-error-color-text)",
					]),
				},
			),
			def.rule(
				what.variant({
					required: true,
				}),
				{
					base: what.css([
						"text-(--input-required-color-text)",
						"font-bold",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"opacity-75",
						"cursor-not-allowed",
					]),
					input: what.css([
						"pointer-events-none",
					]),
				},
			),
		],
		defaults: def.defaults({
			required: false,
			disabled: false,
			isSubmitting: false,
			isLoading: false,
			isError: false,
		}),
	}),
);

export type FormFieldCls = typeof FormFieldCls;

export namespace FormFieldCls {
	export type Props<P = unknown> = Component<FormFieldCls, P>;
}
