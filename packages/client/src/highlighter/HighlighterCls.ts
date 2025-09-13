import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const HighlighterCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"hole",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"fixed",
					"inset-0",
					"pointer-events-auto",
					"z-[10000]",
					"print:hidden",
				]),
				hole: what.both(
					[
						"fixed",
						"ring-2",
						"ring-white/90",
						"shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
						"transition-[top,left,width,height]",
						"duration-300",
						"ease-in-out",
						"shadow-[0_0_0_100vh_rgba(0,0,0,0.6)]",
					],
					[
						"round.default",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type HighlighterCls = typeof HighlighterCls;

export namespace HighlighterCls {
	export type Props<P = unknown> = Cls.Props<HighlighterCls, P>;
}
