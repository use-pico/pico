import { type ClsProps, type ClsSlots, cls } from "@use-pico/cls";

export const PageCls = cls({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-2",
		],
	},
	variant: {},
	defaults: {},
});

export type PageCls = typeof PageCls;

export namespace PageCls {
	export type Props<P = unknown> = ClsProps<PageCls, P>;

	export type Slots = ClsSlots<PageCls>;
}
