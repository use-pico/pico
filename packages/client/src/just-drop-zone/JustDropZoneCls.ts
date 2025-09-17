import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const JustDropZoneCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
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
				root: what.both(
					[
						"JustDropZone-root",
						"flex",
						"flex-col",
						"gap-2",
						"items-center",
						"justify-center",
						"w-full",
					],
					[
						"shadow.default",
					],
				),
				label: what.both(
					[
						"JustDropZone-label",
						"flex",
						"flex-col",
						"items-center",
						"justify-center",
						"w-full",
						"h-64",
						"border-2",
						"border-dashed",
						"cursor-pointer",
					],
					[
						"round.default",
						"tone.neutral.light.border",
						"tone.neutral.light.text",
						"tone.neutral.light.text:hover",
						"tone.neutral.light.bg",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
					],
				),
				zone: what.both(
					[
						"JustDropZone-zone",
						"flex",
						"flex-col",
						"items-center",
						"justify-center",
						"pt-5",
						"pb-6",
					],
					[
						"tone.neutral.light.text",
						"tone.neutral.light.text:hover",
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
					label: what.token([
						"tone.danger.light.text",
						"tone.danger.light.text:hover",
					]),
					zone: what.token([
						"tone.danger.light.text",
					]),
				},
			),
		],
		defaults: def.defaults({
			active: false,
			rejected: false,
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type JustDropZoneCls = typeof JustDropZoneCls;

export namespace JustDropZoneCls {
	export type Props<P = unknown> = Cls.Props<JustDropZoneCls, P>;
}
