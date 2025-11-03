import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const LoadingOverlayCls = contract(PicoCls.contract)
	.slot("root")
	.bool("show")
	.def()
	.root({
		root: {
			class: [
				"LoadingOverlay-root",
				"fixed",
				"inset-0",
				"h-full",
				"items-center",
				"justify-center",
				"flex",
				"transition-all",
				"duration-200",
				"z-10",
				"pointer-events-none",
				"bg-opacity-0",
				"backdrop-blur-none",
			],
			token: [
				"tone.neutral.light.bg",
			],
		},
	})
	.rule(
		{
			show: true,
		},
		{
			root: {
				class: [
					"bg-opacity-50",
					"backdrop-blur-xs",
					"pointer-events-auto",
				],
			},
		},
	)
	.defaults({
		tone: "primary",
		theme: "light",
		show: true,
	})
	.cls();

export type LoadingOverlayCls = typeof LoadingOverlayCls;

export namespace LoadingOverlayCls {
	export type Props<P = unknown> = Cls.Props<LoadingOverlayCls, P>;
}
