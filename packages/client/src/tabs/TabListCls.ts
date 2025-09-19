import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabListCls = contract(PicoCls.contract)
	.slots([
		"root",
		"tabs",
	])
	.def()
	.root({
		root: {
			class: [
				"TabList-root",
				"flex",
				"flex-row",
				"items-center",
				"justify-between",
			],
		},
		tabs: {
			class: [
				"TabList-tabs",
				"flex",
				"flex-row",
				"items-center",
				"gap-1",
				"mb-4",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type TabListCls = typeof TabListCls;

export namespace TabListCls {
	export type Props<P = unknown> = Cls.Props<TabListCls, P>;
}
