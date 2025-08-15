import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const JustDropZoneCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"label",
			"zone",
		],
		variant: {
			active: [
				"bool",
			],
			rejected: [
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
					"flex-col",
					"gap-2",
					"items-center",
					"justify-center",
					"w-full",
				]),
				label: what.both(
					[
						"flex",
						"flex-col",
						"items-center",
						"justify-center",
						"w-full",
						"h-64",
						"border-2",
						"border-dashed",
						"rounded-lg",
						"cursor-pointer",
					],
					[
						"tone.neutral.light.border",
						"tone.neutral.light.bg",
						"tone.neutral.light.bg:hover",
					],
				),
				zone: what.both(
					[
						"flex",
						"flex-col",
						"items-center",
						"justify-center",
						"pt-5",
						"pb-6",
					],
					[
						"tone.neutral.light.text",
					],
				),
			}),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					label: what.both(
						[],
						[
							"tone.primary.light.text",
						],
					),
					zone: what.both(
						[],
						[
							"tone.primary.light.text",
						],
					),
				},
			),
			def.rule(
				what.variant({
					rejected: true,
				}),
				{
					label: what.both(
						[],
						[
							"tone.danger.light.text",
						],
					),
					zone: what.both(
						[],
						[
							"tone.danger.light.text",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			active: false,
			rejected: false,
		}),
	}),
);

export type JustDropZoneCls = typeof JustDropZoneCls;

export namespace JustDropZoneCls {
	export type Props<P = unknown> = Component<JustDropZoneCls, P>;
}
