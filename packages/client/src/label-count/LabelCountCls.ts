import { type ClsProps, cls } from "@use-pico/cls";

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
	export type Props<P = unknown> = ClsProps<typeof LabelCountCls, P>;
}
