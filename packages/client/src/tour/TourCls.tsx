import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TourCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"nav",
			"hole",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"min-w-[215px]",
						"max-w-[285px]",
					],
					[
						"square.md",
						"shadow.default",
						"round.lg",
						"border.default",
						"tone.secondary.light.bg",
						"tone.secondary.light.text",
						"tone.secondary.light.border",
						"tone.secondary.light.shadow",
					],
				),
				nav: what.css([
					"inline-flex",
					"flex-row",
					"items-center",
					"justify-end",
					"gap-2",
				]),
				hole: what.css([
					"rounded-2xl",
					"ring-2",
					"ring-white/90",
					"shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type TourCls = typeof TourCls;

export namespace TourCls {
	export type Props<P = unknown> = Cls.Props<TourCls, P>;
}
