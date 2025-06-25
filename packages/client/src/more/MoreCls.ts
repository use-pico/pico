import { cls } from "@use-pico/common";

export const MoreCls = cls({
	slot: {
		base: [
			"flex",
			"flex-row",
			"flex-wrap",
			"items-center",
			"gap-2",
			"text-sm",
			"font-semibold",
		],
		/**
		 * Preview item
		 */
		item: [
			"border",
			"border-blue-200",
			"bg-blue-50",
			"rounded-md",
			"px-2",
			"py-1",
		],
	},
	variant: {},
	defaults: {},
});
export type MoreCls = typeof MoreCls;

export namespace MoreCls {
	export type Props<P = unknown> = cls.Props<MoreCls, P>;

	export type Slots = cls.Slots<MoreCls>;
}
