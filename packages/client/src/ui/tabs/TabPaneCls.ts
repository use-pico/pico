import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const TabPaneCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.bool("hidden")
	.def()
	.root({
		root: {
			class: [
				"TabPane-root",
			],
		},
	})
	.match("hidden", true, {
		root: {
			class: [
				"hidden",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		hidden: false,
	})
	.cls();

export type TabPaneCls = typeof TabPaneCls;

export namespace TabPaneCls {
	export type Props<P = unknown> = Cls.Props<TabPaneCls, P>;
}
