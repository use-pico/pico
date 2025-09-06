import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ActionMenuCls = PicoCls.extend(
	{
		slot: [
			"base",
		],
		tokens: [],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"flex",
						"flex-col",
						"gap-2",
					],
					[
						"border.default",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
						"tone.neutral.light.shadow",
						"tone.neutral.light.border",
						"round.default",
						"square.lg",
						"shadow.md",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type ActionMenuCls = typeof ActionMenuCls;

export namespace ActionMenuCls {
	export type Props<P = unknown> = Cls.Props<ActionMenuCls, P>;
}
