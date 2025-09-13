import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			active: [
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
						"Tab-root",
						"flex",
						"flex-row",
						"items-center",
						"gap-1",
						"cursor-pointer",
						"border-b-2",
						"border-transparent",
						"py-1",
						"px-2",
						"rounded",
					],
					[
						"border.default",
						"tone.neutral.light.text",
						"tone.neutral.light.border:hover",
					],
				),
			}),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					root: what.both(
						[
							"cursor-default",
							"font-semibold",
						],
						[
							"tone.neutral.light.text:hover",
							"tone.neutral.light.border",
							"tone.neutral.light.bg",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			active: false,
		}),
	}),
);

export type TabCls = typeof TabCls;

export namespace TabCls {
	export type Props<P = unknown> = Cls.Props<TabCls, P>;
}
