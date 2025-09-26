import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FadeCls = contract(PicoCls.contract)
	.tokens([
		"scrollable.from",
		"scrollable.via",
		"scrollable.to",
		"scrollable.gradient",
	])
	.slots([
		"top",
		"bottom",
	])
	.def()
	.token({
		"scrollable.from": {
			class: [],
		},
		"scrollable.via": {
			class: [],
		},
		"scrollable.to": {
			class: [],
		},
		"scrollable.gradient": {
			token: [
				"scrollable.from",
				"scrollable.via",
				"scrollable.to",
			],
		},
	})
	.root({
		top: {
			class: [
				"Fade-top",
				"pointer-events-none",
				"absolute",
				"inset-x-0",
				"-top-px",
				"z-20",
				"opacity-0",
				"will-change-[opacity]",
				"bg-gradient-to-t",
			],
			token: [
				"scrollable.gradient",
			],
		},
		bottom: {
			class: [
				"Fade-bottom",
				"pointer-events-none",
				"absolute",
				"inset-x-0",
				"-bottom-px",
				"z-20",
				"opacity-0",
				"will-change-[opacity]",
				"bg-gradient-to-b",
			],
			token: [
				"scrollable.gradient",
			],
		},
	})
	.tokens.match("theme", "light", {
		"scrollable.from": {
			class: [
				"from-white/0",
			],
		},
		"scrollable.via": {
			class: [],
		},
		"scrollable.to": {
			class: [
				"to-slate-200/85",
			],
		},
	})
	.tokens.match("theme", "dark", {
		"scrollable.from": {
			class: [
				"from-black/0",
			],
		},
		"scrollable.via": {
			class: [],
		},
		"scrollable.to": {
			class: [
				"to-black/50",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "dark",
	})
	.cls();

export type FadeCls = typeof FadeCls;

export namespace FadeCls {
	export type Props<P = unknown> = Cls.PropsTweaks<FadeCls, P>;
}
