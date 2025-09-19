import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ScrollableCls = contract(PicoCls.contract)
	.tokens([
		"scrollable.fade.color",
	])
	.slots([
		"root",
		"viewport",
		"content",
		"fadeTop",
		"fadeBottom",
	])
	.variant("layout", [
		"grid",
		"flex",
		"absolute",
	])
	.def()
	.token({
		"scrollable.fade.color": {
			class: [
				"[--fade-color:var(--color-slate-300)]",
			],
		},
	})
	.root({
		root: {
			class: [
				"Scrollable-root",
				"relative",
				"isolate",
				"overflow-hidden",
				"[--fade-solid:12px]",
			],
			token: [
				"round.lg",
				"scrollable.fade.color",
			],
		},
		viewport: {
			class: [
				"Scrollable-viewport",
				"overflow-auto",
				"overscroll-y-contain",
				"h-full",
				"min-h-0",
			],
		},
		content: {
			class: [
				"Scrollable-content",
				"grid",
				"content-center",
				"justify-items-stretch",
				"min-h-full",
			],
		},
		fadeTop: {
			class: [
				"Scrollable-fadeTop",
				"pointer-events-none",
				"absolute",
				"inset-x-0",
				"-top-px",
				"z-10",
				"opacity-0",
				"will-change-[opacity]",
				"bg-[linear-gradient(to_bottom,var(--fade-color),var(--fade-color)_var(--fade-solid),transparent)]",
			],
		},
		fadeBottom: {
			class: [
				"Scrollable-fadeBottom",
				"pointer-events-none",
				"absolute",
				"inset-x-0",
				"-bottom-px",
				"z-10",
				"opacity-0",
				"will-change-[opacity]",
				"bg-[linear-gradient(to_top,var(--fade-color),var(--fade-color)_var(--fade-solid),transparent)]",
			],
		},
	})
	// Layout variants
	.match("layout", "grid", {
		root: {
			class: [
				"min-h-0",
				"h-full",
			],
		},
	})
	.match("layout", "flex", {
		root: {
			class: [
				"flex-1",
				"min-h-0",
				"h-auto",
			],
		},
	})
	.match("layout", "absolute", {
		root: {
			class: [
				"absolute",
				"inset-0",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		layout: "flex",
	})
	.cls();

export type ScrollableCls = typeof ScrollableCls;

export namespace ScrollableCls {
	export type Props<P = unknown> = Cls.Props<ScrollableCls, P>;
}
