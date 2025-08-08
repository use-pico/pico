import { type Component, component } from "@use-pico/cls";

export const MoreCls = component({
	slots: [
		"base",
		"item",
	],
	slot: {
		base: {
			class: [
				"flex",
				"flex-row",
				"flex-wrap",
				"items-center",
				"gap-2",
				"text-sm",
				"font-semibold",
			],
		},
		item: {
			class: [
				"border",
				"border-blue-200",
				"bg-blue-50",
				"rounded-md",
				"px-2",
				"py-1",
			],
		},
	},
});
export type MoreCls = typeof MoreCls;

export namespace MoreCls {
	export type Props<P = unknown> = Component<typeof MoreCls, P>;
}
