import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const ModalCls = contract(PicoCls.contract)
	.slots([
		"root",
		"target",
		"modal",
	])
	.bool("disabled")
	.bool("loading")
	.variant("size", [
		"sm",
		"md",
		"lg",
	])
	.def()
	.root({
		root: {
			class: [
				"Modal-root",
				"backdrop-blur-xs",
				"flex",
				"justify-center",
				"py-12",
			],
			token: [
				"tone.neutral.light.bg",
				"focus.off",
			],
		},
		target: {
			class: [
				"Modal-target",
			],
		},
		modal: {
			class: [
				"Modal-modal",
				"bg-white",
				"shadow-lg",
				"p-4",
				"max-h-full",
				"h-fit",
				"flex",
				"flex-col",
				"gap-2",
			],
			token: [
				"round.default",
				"focus.off",
			],
		},
	})
	.match("disabled", true, {
		root: {
			class: [
				"pointer-events-none",
				"cursor-not-allowed",
			],
		},
	})
	.match("loading", true, {
		root: {
			class: [
				"pointer-events-none",
				"opacity-50",
			],
		},
	})
	.match("size", "sm", {
		modal: {
			class: [
				"w-1/3",
			],
		},
	})
	.match("size", "md", {
		modal: {
			class: [
				"w-2/3",
			],
		},
	})
	.match("size", "lg", {
		modal: {
			class: [
				"w-4/5",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		disabled: false,
		loading: false,
		size: "md",
	})
	.cls();

export type ModalCls = typeof ModalCls;

export namespace ModalCls {
	export type Props<P = unknown> = Cls.Props<ModalCls, P>;
}
