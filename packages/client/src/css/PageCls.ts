import { cls } from "@use-pico/cls";

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
	export type Props<P = unknown> = cls.Props<PageCls, P>;

	export type Slots = cls.Slots<PageCls>;
}
