import { type Component, component } from "@use-pico/cls";

export const PageCls = component({
	slots: [
		"base",
	],
	slot: {
		base: {
			class: [
				"flex",
				"flex-col",
				"gap-2",
			],
		},
	},
});

export type PageCls = typeof PageCls;

export namespace PageCls {
	export type Props<P = unknown> = Component<typeof PageCls, P>;
}
