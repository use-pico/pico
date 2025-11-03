import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const FadeCls = contract(PicoCls.contract)
	.tokens([
		"fade.from",
		"fade.via",
		"fade.to",
		"fade.gradient",
	])
	.slots([
		"top",
		"bottom",
	])
	.def()
	.token({
		"fade.from": {
			class: [],
		},
		"fade.via": {
			class: [],
		},
		"fade.to": {
			class: [],
		},
		"fade.gradient": {
			token: [
				"fade.from",
				"fade.via",
				"fade.to",
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
				"bg-linear-to-t",
				"blur-2xl",
				"overflow-hidden",
			],
			token: [
				"fade.gradient",
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
				"bg-linear-to-b",
				"blur-2xl",
				"overflow-hidden",
			],
			token: [
				"fade.gradient",
			],
		},
	})
	.tokens.match("theme", "light", {
		"fade.from": {
			class: [
				"from-white/0",
			],
		},
		"fade.via": {
			class: [],
		},
		"fade.to": {
			class: [
				"to-slate-200/85",
			],
		},
	})
	.tokens.match("theme", "dark", {
		"fade.from": {
			class: [
				"from-black/0",
			],
		},
		"fade.via": {
			class: [],
		},
		"fade.to": {
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
	export type Props<P = unknown> = Cls.Props<FadeCls, P>;
}
