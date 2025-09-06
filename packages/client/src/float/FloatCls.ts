import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FloatCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"target",
			"portal",
		],
		variant: {
			mounted: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				target: what.css([
					"flex",
					"justify-center",
					"items-center",
				]),
				portal: what.css([]),
			}),
			def.rule(
				what.variant({
					mounted: false,
				}),
				{
					portal: what.css([
						"hidden",
					]),
				},
			),
		],
		defaults: def.defaults({
			mounted: false,
		}),
	}),
);

export type FloatCls = typeof FloatCls;

export namespace FloatCls {
	export type Props<P = unknown> = Cls.Props<FloatCls, P>;
}
