import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { FormFieldCls } from "../form/FormFieldCls";

export const SelectCls = contract(FormFieldCls.contract)
	.slots([
		"popup",
		"item",
	])
	.bool("disabled")
	.bool("active")
	.bool("selected")
	.def()
	.root({
		input: {
			class: [
				"inline-flex",
				"flex-row",
				"w-fit",
				"items-center",
				"justify-between",
				"cursor-pointer",
				"gap-2",
			],
		},
		popup: {
			class: [
				"Select-popup",
				"flex",
				"flex-col",
				"overflow-y-auto",
				"bg-white",
				"focus:outline-hidden",
				"gap-1",
			],
			token: [
				"border.default",
				"shadow.default",
				"round.default",
				"tone.neutral.light.border",
				"square.xs",
			],
		},
		item: {
			class: [
				"Select-item",
				"focus:outline-hidden",
				"flex",
				"items-center",
				"justify-between",
				"gap-2",
				"cursor-pointer",
			],
			token: [
				"padding.md",
				"round.default",
			],
		},
	})
	.match("disabled", true, {
		root: {
			class: [
				"cursor-not-allowed",
				"hover:shadow-none",
				"opacity-50",
			],
			token: [
				"tone.neutral.light.border",
			],
		},
	})
	.match("selected", true, {
		item: {
			token: [
				"tone.neutral.light.bg",
			],
		},
	})
	.match("active", true, {
		item: {
			token: [
				"tone.neutral.light.bg:hover",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		size: "md",
		full: false,
		isError: false,
		isLoading: false,
		isSubmitting: false,
		required: false,
		disabled: false,
		selected: false,
		active: false,
	})
	.cls();

export type SelectCls = typeof SelectCls;

export namespace SelectCls {
	export type Props<P = unknown> = Cls.Props<SelectCls, P>;
}
