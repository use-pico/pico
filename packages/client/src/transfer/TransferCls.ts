import { cls } from "@use-pico/common";

export const TransferCls = cls({
	slot: {
		base: [
			"grid",
			"grid-cols-2",
			"gap-2",
			"select-none",
		],
		panel: [
			"grow",
			"border",
			"border-slate-200",
			"rounded",
			"p-4",
		],
		group: [
			"transition-none",
		],
		header: [
			"font-bold",
		],
		item: [
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
	variant: {},
	defaults: {},
});
export type TransferCls = typeof TransferCls;

export namespace TransferCls {
	export type Props<P = unknown> = cls.Props<typeof TransferCls, P>;
}
