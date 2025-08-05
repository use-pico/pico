import { type ClsProps, cls } from "@use-pico/cls";

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
	export type Props<P = unknown> = ClsProps<typeof DeleteControlCls, P>;
}
