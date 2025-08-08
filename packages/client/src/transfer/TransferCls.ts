import { type Component, component } from "@use-pico/cls";

export const TransferCls = component({
	slots: [
		"base",
		"panel",
		"group",
		"header",
		"item",
	],
	root: {
		base: {
			class: [
				"grid",
				"grid-cols-2",
				"gap-2",
				"select-none",
			],
		},
		panel: {
			class: [
				[
					"grow",
					"border",
					"border-slate-200",
					"rounded",
					"p-4",
				],
			],
		},
		group: {
			class: [
				"transition-none",
			],
		},
		header: {
			class: [
				"font-bold",
			],
		},
		item: {
			class: [
				"flex",
				"flex-row",
				"items-center",
				"justify-between",
				"p-2",
				"rounded",
				"border-b",
				"border-transparent",
				"hover:border-slate-300",
				"hover:bg-slate-100",
				"cursor-pointer",
				"group",
			],
		},
	},
	defaults: {},
});
export type TransferCls = typeof TransferCls;

export namespace TransferCls {
	export type Props<P = unknown> = Component<typeof TransferCls, P>;
}
