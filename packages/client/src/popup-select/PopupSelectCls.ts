import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PopupSelectCls = contract(PicoCls.contract)
	.slots([
		"input",
	])
	.bool("isLoading")
	.bool("selected")
	.def()
	.root({
		input: {
			class: [
				"PopupSelect-input",
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
				"cursor-pointer",
				"transition-all",
				"duration-100",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		isLoading: false,
		selected: false,
	})
	.cls();

export type PopupSelectCls = typeof PopupSelectCls;

export namespace PopupSelectCls {
	export type Props<P = unknown> = Cls.Props<PopupSelectCls, P>;

	export type Slots = Cls.SlotsOf<PopupSelectCls>;
}
