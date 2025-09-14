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
						"ring-2",
						"ring-white/90",
						"shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
						"transition-[top,left,width,height]",
						"duration-300",
						"ease-in-out",
						"shadow-[0_0_0_300vh_rgba(0,0,0,0.6)]",
					],
					[
						"round.default",
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
			center: false,
		}),
	}),
);

export type HighlighterCls = typeof HighlighterCls;

export namespace HighlighterCls {
	export type Props<P = unknown> = Cls.Props<HighlighterCls, P>;
}
