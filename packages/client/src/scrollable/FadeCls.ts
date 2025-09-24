import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FadeCls = contract(PicoCls.contract)
	.tokens([
		"scrollable.fade.color",
	])
	.slots([
		"top",
		"bottom",
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
				"bg-[linear-gradient(to_bottom,var(--fade-color),var(--fade-color)_var(--fade-solid),transparent)]",
			],
			token: [
				"scrollable.fade.color",
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
				"bg-[linear-gradient(to_top,var(--fade-color),var(--fade-color)_var(--fade-solid),transparent)]",
			],
			token: [
				"scrollable.fade.color",
			],
		},
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
