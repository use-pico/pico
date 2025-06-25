import { cls } from "@use-pico/common";

export const TitlePreviewCls = cls({
	slot: {
		base: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
		],
		title: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"text-lg",
			"text-slate-500",
			"font-bold",
		],
		subtitle: [
			"flex",
			"flex-row",
			"gap-4",
			"items-center",
			"text-lg",
		],
	},
	variant: {
		withSubtitle: {
			true: [],
		},
	},
	match: [
		{
			if: {
				withSubtitle: true,
			},
			do: {
				title: [
					"border-r",
					"border-r-slate-300",
					"pr-2",
				],
			},
		},
	],
	defaults: {
		withSubtitle: false,
	},
});

export namespace TitlePreviewCls {
	export type Props<P = unknown> = cls.Props<typeof TitlePreviewCls, P>;
}
