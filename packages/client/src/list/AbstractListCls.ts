import { cls } from "@use-pico/cls";

export const AbstractListCls = cls({
	slot: {
		root: [] as string[],
		body: [] as string[],
		items: [] as string[],
	},
	variant: {},
	defaults: {},
});

export namespace AbstractListCls {
	export type Props<P = unknown> = cls.Props<typeof AbstractListCls, P>;
}
