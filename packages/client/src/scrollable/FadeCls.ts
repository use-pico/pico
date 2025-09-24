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
			class: [
				"from-white/0",
			],
		},
		"scrollable.via": {
			class: [
				"via-yellow-500",
			],
		},
		"scrollable.to": {
			class: [
				"to-blue-500",
			],
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
	.match("theme", "light", {
        
    })
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type FadeCls = typeof FadeCls;

export namespace FadeCls {
	export type Props<P = unknown> = Cls.Props<FadeCls, P>;
}
