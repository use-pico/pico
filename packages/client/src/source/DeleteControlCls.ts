import { cls } from "@use-pico/common";

export const DeleteControlCls = cls({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-4",
		],
		content: [
			"text-bold",
			"text-red-500",
			"font-bold",
		],
		footer: [
			"flex",
			"flex-row",
			"items-center",
			"justify-between",
			"gap-4",
		],
	},
	variant: {},
	defaults: {},
});

export namespace DeleteControlCls {
	export type Props<P = unknown> = cls.Props<typeof DeleteControlCls, P>;
}
