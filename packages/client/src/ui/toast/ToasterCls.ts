import { type Cls, contract } from "@use-pico/cls";
import { PicoCls } from "../../cls";

export const ToasterCls = contract(PicoCls.contract)
	.slots([
		"root",
		"item",
	])
	.variant("position", [
		"top-right",
		"top-center",
		"top-left",
		"bottom-right",
		"bottom-center",
		"bottom-left",
	])
	.def()
	.root({
		root: {
			class: [
				"pointer-events-none",
				"fixed",
				"z-[500]",
			],
		},
		item: {
			class: [
				"Toaster-Item",
				"pointer-events-auto",
				"opacity-0",
			],
		},
	})
	//
	.match("position", "top-left", {
		root: {
			class: [
				"top-0",
				"left-0",
				"items-start",
			],
		},
	})
	.match("position", "top-center", {
		root: {
			class: [
				"top-0",
				"left-1/2",
				"-translate-x-1/2",
				"items-center",
			],
		},
	})
	.match("position", "top-right", {
		root: {
			class: [
				"top-0",
				"right-0",
				"items-end",
			],
		},
	})
	.match("position", "bottom-left", {
		root: {
			class: [
				"bottom-0",
				"left-0",
				"items-start",
			],
		},
	})
	.match("position", "bottom-center", {
		root: {
			class: [
				"bottom-0",
				"left-1/2",
				"-translate-x-1/2",
				"items-center",
			],
		},
	})
	.match("position", "bottom-right", {
		root: {
			class: [
				"bottom-0",
				"right-0",
				"items-end",
			],
		},
	})
	//
	.defaults({
		position: "top-center",
		tone: "primary",
		theme: "light",
	})
	.cls();

export type ToasterCls = typeof ToasterCls;

export namespace ToasterCls {
	export type Props<P = unknown> = Cls.Props<ToasterCls, P>;
}
