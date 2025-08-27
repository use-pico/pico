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
			size: [
				"xs",
				"sm",
				"md",
				"lg",
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
						"duration-300",
					],
					[
						"shadow.default",
						"border.default",
						"round.default",
						"tone.neutral.light.set",
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
						"tone.warning.light.set",
					]),
				},
			),
			def.rule(
				what.variant({
					isError: true,
				}),
				{
					input: what.token([
						"tone.danger.light.set",
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
			def.rule(
				what.variant({
					size: "xs",
				}),
				{
					input: what.token([
						"padding.xs",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					input: what.token([
						"padding.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					input: what.token([
						"padding.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					input: what.token([
						"padding.lg",
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
			size: "sm",
		}),
	}),
);

export type FormFieldCls = typeof FormFieldCls;

export namespace FormFieldCls {
	export type Props<P = unknown> = Component<FormFieldCls, P>;
}
