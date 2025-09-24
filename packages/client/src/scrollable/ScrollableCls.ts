import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ScrollableCls = contract(PicoCls.contract)
	.slots([
		"root",
		"viewport",
		"content",
	])
	.variant("layout", [
		"grid",
		"flex",
		"absolute",
	])
	.def()
	.root({
		root: {
			class: [
				"Scrollable-root",
				"relative",
				"isolate",
				"overflow-hidden",
			],
			token: [
				"round.lg",
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
