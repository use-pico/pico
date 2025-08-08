import { type Component, classes, component } from "@use-pico/cls";

export const AbstractListCls = component({
	slots: [
		"root",
		"body",
		"items",
	],
	slot: {
		root: classes([]),
		body: classes([]),
		items: classes([]),
	},
});

export namespace AbstractListCls {
	export type Props<P = unknown> = Component<typeof AbstractListCls, P>;
}
