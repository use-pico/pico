import { type ClsProps, cls } from "@use-pico/cls";

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
	export type Props<P = unknown> = ClsProps<typeof AbstractListCls, P>;
}
