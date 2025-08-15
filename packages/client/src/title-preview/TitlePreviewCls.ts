import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TitlePreviewCls = PicoCls.extend(
	{
		tokens: [],
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
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
				]),
				title: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"text-lg",
						"font-bold",
					],
					[
						"tone.neutral.light.text",
					],
				),
				subtitle: what.css([
					"flex",
					"flex-row",
					"gap-4",
					"items-center",
					"text-lg",
				]),
			}),
			def.rule(
				what.variant({
					withSubtitle: true,
				}),
				{
					title: what.both(
						[
							"border-r",
							"pr-2",
						],
						[
							"tone.neutral.light.border",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			withSubtitle: false,
		}),
	}),
);

export type TitlePreviewCls = typeof TitlePreviewCls;

export namespace TitlePreviewCls {
	export type Props<P = unknown> = Component<TitlePreviewCls, P>;
}
