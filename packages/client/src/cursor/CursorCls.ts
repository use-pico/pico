import { type Component, component } from "@use-pico/cls";

export const CursorCls = component({
	slots: [
		"base",
		"sums",
	],
	slot: {
		base: {
			class: [
				"flex",
				"items-center",
				"justify-between",
				"gap-2",
			],
		},
		sums: {
			class: [
				"flex",
				"items-center",
				"gap-2",
				"text-sm",
			],
		},
	},
});
export type CursorCls = typeof CursorCls;

export namespace CursorCls {
	export type Props<P = unknown> = Component<typeof CursorCls, P>;
}
