import { type Component, variant } from "@use-pico/cls";

export const TitlePreviewCls = variant({
	slots: [
		"base",
		"title",
		"subtitle",
	],
	variants: {
		withSubtitle: [
			"bool",
		],
	},
	rules: [
		{
			slot: {
				base: {
					class: [
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
					],
				},
				title: {
					class: [
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"text-lg",
						"text-slate-500",
						"font-bold",
					],
				},
				subtitle: {
					class: [
						"flex",
						"flex-row",
						"gap-4",
						"items-center",
						"text-lg",
					],
				},
			},
		},
		{
			match: {
				withSubtitle: true,
			},
			slot: {
				title: {
					class: [
						"border-r",
						"border-r-slate-300",
						"pr-2",
					],
				},
			},
		},
	],
	defaults: {
		withSubtitle: false,
	},
});

export namespace TitlePreviewCls {
	export type Props<P = unknown> = Component<typeof TitlePreviewCls, P>;
}
