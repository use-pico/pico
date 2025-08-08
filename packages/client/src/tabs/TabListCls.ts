import { type Component, classes, component } from "@use-pico/cls";

export const TabListCls = component({
	slots: [
		"base",
		"tabs",
	],
	root: {
		base: classes([
			"flex",
			"flex-row",
			"items-center",
			"justify-between",
		]),
		tabs: classes([
			"flex",
			"flex-row",
			"items-center",
			"gap-1",
			"mb-4",
		]),
	},
});

export namespace TabListCls {
	export type Props<P = unknown> = Component<typeof TabListCls, P>;
}
