import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TitlePreviewCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
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
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
					],
					[
						"square.sm",
					],
				),
				title: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
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
	export type Props<P = unknown> = Cls.Props<TitlePreviewCls, P>;
}
