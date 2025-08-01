import { cls } from "@use-pico/common";

export const AbstractListCls = cls({
	slot: {
		root: [],
		items: [],
	},
	variant: {},
	defaults: {},
});

export namespace AbstractListCls {
	export type Props<P = unknown> = cls.Props<typeof AbstractListCls, P>;
}
