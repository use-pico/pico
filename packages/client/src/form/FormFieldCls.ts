import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormFieldCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"header",
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
				"xl",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"FormField-root",
					"flex",
					"flex-col",
					"gap-1",
				]),
				header: what.css([
					"FormField-header",
					"flex",
					"flex-col",
					"w-full",
				]),
				input: what.both(
					[
						"FormField-input",
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
					root: what.css([
						"opacity-80",
						"cursor-not-allowed",
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
						"size.xs",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					input: what.token([
						"size.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					input: what.token([
						"size.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					input: what.token([
						"size.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xl",
				}),
				{
					input: what.token([
						"size.xl",
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
			size: "md",
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type FormFieldCls = typeof FormFieldCls;

export namespace FormFieldCls {
	export type Props<P = unknown> = Cls.Props<FormFieldCls, P>;
}
