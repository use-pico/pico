import { cls } from "@use-pico/common";

export const LabelCountCls = cls({
	slot: {
		base: [
			"flex",
			"flex-row",
			"items-center",
			"w-fit",
			"gap-2",
		],
		label: [],
	},
	variant: {},
	defaults: {},
});

export namespace LabelCountCls {
	export type Props<P = unknown> = cls.Props<typeof LabelCountCls, P>;
}
