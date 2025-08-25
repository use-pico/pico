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
					base: what.token([
						"tone.danger.light.text",
					]),
				},
			),
			def.rule(
				what.variant({
					required: true,
				}),
				{
					base: what.token([
						"tone.secondary.light.text",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"opacity-70",
						"cursor-not-allowed",
					]),
					input: what.both(
						[
							"pointer-events-none",
						],
						[
							"tone.secondary.light.bg",
						],
					),
				},
			),
			def.rule(
				what.variant({
					isError: true,
					disabled: true,
				}),
				{
					input: what.token([
						"tone.danger.light.bg",
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
