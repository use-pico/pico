import { type ClsProps, type ClsSlots, cls } from "@use-pico/cls";

export const CursorCls = cls({
	slot: {
		base: [
			"flex",
			"items-center",
			"justify-between",
			"gap-2",
		],
		sums: [
			"flex",
			"items-center",
			"gap-2",
			"text-sm",
		],
	},
	variant: {},
	defaults: {},
});
export type CursorCls = typeof CursorCls;

export namespace CursorCls {
	export type Props<P = unknown> = ClsProps<CursorCls, P>;

	export type Slots = ClsSlots<CursorCls>;
}
