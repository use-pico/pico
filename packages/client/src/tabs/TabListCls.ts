import { type ClsProps, cls } from "@use-pico/cls";

export const TabListCls = cls({
	slot: {
		base: [
			"flex",
			"flex-row",
			"items-center",
			"justify-between",
		],
		tabs: [
			"flex",
			"flex-row",
			"items-center",
			"gap-1",
			"mb-4",
		],
	},
	variant: {},
	defaults: {},
});

export namespace TabListCls {
	export type Props<P = unknown> = ClsProps<typeof TabListCls, P>;
}
