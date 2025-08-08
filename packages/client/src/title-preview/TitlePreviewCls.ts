import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TitlePreviewCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"title",
			"subtitle",
		],
		variant: {
			withSubtitle: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule }) => [
			root({
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
			}),
			rule(
				{
					withSubtitle: true,
				},
				{
					title: {
						class: [
							"border-r",
							"border-r-slate-300",
							"pr-2",
						],
					},
				},
			),
		],
		defaults: {
			withSubtitle: false,
		},
	},
);

export type TitlePreviewCls = typeof TitlePreviewCls;

export namespace TitlePreviewCls {
	export type Props<P = unknown> = Component<TitlePreviewCls, P>;
}
