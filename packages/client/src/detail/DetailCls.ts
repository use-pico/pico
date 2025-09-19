import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DetailCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.def()
	.root({
		root: {
			class: [
				"Detail-root",
				"flex",
				"flex-row",
				"flex-wrap",
			],
			token: [
				"border.default",
				"shadow.default",
				"round.default",
				"square.md",
				"tone.neutral.light.border",
				"tone.neutral.light.shadow",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type DetailCls = typeof DetailCls;

export namespace DetailCls {
	export type Props<P = unknown> = Cls.Props<DetailCls, P>;

	export type Slots = Cls.SlotsOf<DetailCls>;
}
