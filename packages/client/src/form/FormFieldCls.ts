import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormFieldCls = contract(PicoCls.contract)
	.slots([
		"root",
		"header",
		"input",
	])
	.bool("required")
	.bool("disabled")
	.bool("isSubmitting")
	.bool("isLoading")
	.bool("isError")
	.variant("size", [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.def()
	.root({
		root: {
			class: [
				"FormField-root",
				"flex",
				"flex-col",
				"gap-1",
			],
		},
		header: {
			class: [
				"FormField-header",
				"flex",
				"flex-col",
				"w-full",
			],
		},
		input: {
			class: [
				"FormField-input",
				"transition-all",
				"duration-300",
			],
			token: [
				"shadow.default",
				"border.default",
				"round.default",
				"tone.neutral.light.set",
				"focus.off",
			],
		},
	})
	.match("required", true, {
		input: {
			token: [
				"tone.warning.light.set",
			],
		},
	})
	.match("isError", true, {
		input: {
			token: [
				"tone.danger.light.set",
			],
		},
	})
	.match("disabled", true, {
		root: {
			class: [
				"opacity-80",
				"cursor-not-allowed",
			],
		},
		input: {
			class: [
				"pointer-events-none",
			],
			token: [
				"tone.neutral.light.bg",
			],
		},
	})
	.rule(
		{
			disabled: true,
			isError: true,
		},
		{
			input: {
				token: [
					"tone.danger.light.bg",
				],
			},
		},
	)
	.match("size", "xs", {
		input: {
			token: [
				"size.xs",
			],
		},
	})
	.match("size", "sm", {
		input: {
			token: [
				"size.sm",
			],
		},
	})
	.match("size", "md", {
		input: {
			token: [
				"size.md",
			],
		},
	})
	.match("size", "lg", {
		input: {
			token: [
				"size.lg",
			],
		},
	})
	.match("size", "xl", {
		input: {
			token: [
				"size.xl",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		required: false,
		disabled: false,
		isSubmitting: false,
		isLoading: false,
		isError: false,
		size: "md",
	})
	.cls();

export type FormFieldCls = typeof FormFieldCls;

export namespace FormFieldCls {
	export type Props<P = unknown> = Cls.Props<FormFieldCls, P>;
}
