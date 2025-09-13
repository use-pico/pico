import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const SnapperItemCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			orientation: [
				"vertical",
				"horizontal",
			],
			disabled: [
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
						"relative",
						"snap-start",
						"min-h-0",
						"min-w-0",
						"[scroll-snap-stop:always]",
					],
					[
						"round.xl",
					],
				),
			}),
			def.rule(
				what.variant({
					orientation: "vertical",
				}),
				{
					root: what.css([
						"min-h-full",
					]),
				},
			),
			def.rule(
				what.variant({
					orientation: "horizontal",
				}),
				{
					root: what.css([
						"min-w-full",
						"h-full",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"opacity-25",
						"pointer-events-none",
					]),
				},
			),
		],
		defaults: def.defaults({
			orientation: "vertical",
			disabled: false,
		}),
	}),
);

export type SnapperItemCls = typeof SnapperItemCls;

export namespace SnapperItemCls {
	export type Props<P = unknown> = Cls.Props<SnapperItemCls, P>;
}
