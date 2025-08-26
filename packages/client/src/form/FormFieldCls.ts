import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormFieldCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"header",
			"label",
			"hint",
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
				header: what.css([
					"flex",
					"flex-col",
					"w-full",
				]),
				label: what.css([
					"font-medium",
				]),
				hint: what.css([
					"text-sm",
					"italic",
					"text-gray-500",
				]),
				input: what.both(
					[
						"w-full",
						"transition-all",
						"duration-100",
					],
					[
						"shadow.default",
						"square.md",
						"border.default",
						"round.default",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
						"focus.off",
					],
				),
			}),
			def.rule(
				what.variant({
					required: true,
				}),
				{
					input: what.token([
						"tone.secondary.light.text",
						"tone.secondary.light.text:hover",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
						"tone.secondary.light.border:hover",
						"tone.secondary.light.shadow",
						"tone.secondary.light.shadow:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					isError: true,
				}),
				{
					input: what.token([
						"tone.danger.light.text",
						"tone.danger.light.text:hover",
						"tone.danger.light.bg",
						"tone.danger.light.border",
						"tone.danger.light.border:hover",
						"tone.danger.light.shadow",
						"tone.danger.light.shadow:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"opacity-80",
						"cursor-not-allowed",
					]),
					label: what.css([
						"opacity-50",
					]),
					input: what.both(
						[
							"pointer-events-none",
						],
						[
							"tone.neutral.light.bg",
						],
					),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
					isError: true,
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
