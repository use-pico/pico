import { type Component, classes, component } from "@use-pico/cls";

export const LabelCountCls = component({
	slots: [
		"base",
		"label",
	],
	slot: {
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
