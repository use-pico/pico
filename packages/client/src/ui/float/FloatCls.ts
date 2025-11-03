import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const FloatCls = contract(PicoCls.contract)
	.slots([
		"target",
		"portal",
	])
	.bool("mounted")
	.def()
	.root({
		target: {
			class: [
				"Float-target",
				"flex",
				"justify-center",
				"items-center",
			],
		},
		portal: {
			class: [
				"Float-portal",
			],
		},
	})
	.match("mounted", false, {
		portal: {
			class: [
				"hidden",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		mounted: false,
	})
	.cls();

export type FloatCls = typeof FloatCls;

export namespace FloatCls {
	export type Props<P = unknown> = Cls.Props<FloatCls, P>;
}
