import { type Component, classes } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LabelCountCls = PicoCls.component({
	slots: [
		"base",
		"label",
	],
	root: {
		base: classes([
			"flex",
			"flex-row",
			"items-center",
			"w-fit",
			"gap-2",
		]),
		label: classes([]),
	},
});

export namespace LabelCountCls {
	export type Props<P = unknown> = Component<typeof LabelCountCls, P>;
}
