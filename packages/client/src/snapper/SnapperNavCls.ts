import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const SnapperNavCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"items",
		],
		variant: {
			orientation: [
				"vertical",
				"horizontal",
			],
			align: [
				"left",
				"right",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"SnapperNav-root",
						"absolute",
						"z-20",
						"pointer-events-none",
						"bg-white/80",
					],
					[
						"square.sm",
					],
				),
				items: what.css([
					"SnapperNav-items",
					"gap-4",
				]),
			}),
			def.rule(
				what.variant({
					orientation: "vertical",
				}),
				{
					root: what.token([
						"round.lg",
					]),
					items: what.css([
						"flex",
						"flex-col",
					]),
				},
			),
			def.rule(
				what.variant({
					orientation: "horizontal",
				}),
				{
					root: what.both(
						[
							"bottom-4",
							"left-1/2",
							"-translate-x-1/2",
						],
						[
							"round.xl",
						],
					),
					items: what.css([
						"flex",
						"flex-row",
						"gap-0",
					]),
				},
			),
			def.rule(
				what.variant({
					orientation: "vertical",
					align: "left",
				}),
				{
					root: what.css([
						"left-1",
						"top-1/2",
						"-translate-y-1/2",
					]),
				},
			),
			def.rule(
				what.variant({
					orientation: "vertical",
					align: "right",
				}),
				{
					root: what.css([
						"right-1",
						"top-1/2",
						"-translate-y-1/2",
					]),
				},
			),
		],
		defaults: def.defaults({
			orientation: "vertical",
			align: "right",
		}),
	}),
);

export type SnapperNavCls = typeof SnapperNavCls;

export namespace SnapperNavCls {
	export type Props<P = unknown> = Cls.Props<SnapperNavCls, P>;
}
