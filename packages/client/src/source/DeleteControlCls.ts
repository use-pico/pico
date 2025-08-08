import { type Component, classes, component } from "@use-pico/cls";

export const DeleteControlCls = component({
	slots: [
		"base",
		"content",
		"footer",
	],
	slot: {
		base: classes([
			"flex",
			"flex-col",
			"gap-4",
		]),
		content: classes([
			"text-bold",
			"text-red-500",
			"font-bold",
		]),
		footer: classes([
			"flex",
			"flex-row",
			"items-center",
			"justify-between",
			"gap-4",
		]),
	},
});

export namespace DeleteControlCls {
	export type Props<P = unknown> = Component<typeof DeleteControlCls, P>;
}
