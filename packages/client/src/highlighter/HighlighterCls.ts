import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const HighlighterCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"hole",
		],
		variant: {
			center: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"Highlighter-root",
					"fixed",
					"inset-0",
					"pointer-events-auto",
					"z-[10000]",
					"print:hidden",
				]),
				hole: what.both(
					[
						"Highlighter-hole",
						"fixed",
						"shadow-[0_0_0_300vh_rgba(0,0,0,0.6)]",
						"transition-[top,left,width,height]",
						"duration-300",
						"ease-in-out",
					],
					[
						"round.default",
						"border.default",
						"tone.primary.light.border",
					],
				),
			}),
			def.rule(
				what.variant({
					center: true,
				}),
				{
					hole: what.css([
						"fixed",
						"left-1/2",
						"top-1/2",
						"-translate-x-1/2",
						"-translate-y-1/2",
						"w-0",
						"h-0",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
			center: false,
		}),
	}),
);

export type HighlighterCls = typeof HighlighterCls;

export namespace HighlighterCls {
	export type Props<P = unknown> = Cls.Props<HighlighterCls, P>;
}
