import { PicoCls } from "@use-pico/client";
import type { Cls } from "@use-pico/cls";

export const SnapperNavCls = PicoCls.extend(
	{
		tokens: [
			"snapper.nav.edge.common",
			"snapper.nav.edge.enabled",
			"snapper.nav.edge.disabled",
		],
		slot: [
			"root",
			"items",
			"item",
			"first",
			"last",
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
			active: [
				"bool",
			],
			first: [
				"bool",
			],
			last: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({
			"snapper.nav.edge.common": what.css([
				"pointer-events-auto",
				"select-none",
				"transition",
			]),
			"snapper.nav.edge.enabled": what.css([
				"opacity-80",
				"hover:opacity-100",
				"cursor-pointer",
			]),
			"snapper.nav.edge.disabled": what.css([
				"opacity-40",
				"hover:opacity-40",
				"cursor-not-allowed",
			]),
		}),
		rules: [
			def.root({
				root: what.both(
					[
						"SnapperNav-root",
						"absolute",
						"z-20",
						"pointer-events-none",
						"bg-white/70",
					],
					[
						"square.sm",
						"round.lg",
					],
				),
				items: what.css([
					"SnapperNav-items",
					"gap-4",
					"flex",
					"items-center",
					"justify-center",
				]),
				item: what.css([
					"pointer-events-auto",
					"select-none",
					"transition",
					"cursor-pointer",
				]),
				first: what.token([
					"snapper.nav.edge.common",
				]),
				last: what.token([
					"snapper.nav.edge.common",
				]),
			}),
			def.rule(
				what.variant({
					orientation: "vertical",
				}),
				{
					items: what.css([
						"flex-col",
					]),
				},
			),
			def.rule(
				what.variant({
					orientation: "horizontal",
				}),
				{
					root: what.css([
						"bottom-4",
						"left-1/2",
						"-translate-x-1/2",
					]),
					items: what.css([
						"flex-row",
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
			def.rule(
				what.variant({
					active: true,
				}),
				{
					item: what.css([
						"scale-125",
						"opacity-100",
					]),
				},
			),
			def.rule(
				what.variant({
					active: false,
				}),
				{
					item: what.css([
						"opacity-60",
						"hover:opacity-90",
					]),
				},
			),
			def.rule(
				what.variant({
					first: true,
				}),
				{
					first: what.token([
						"snapper.nav.edge.disabled",
					]),
				},
			),
			def.rule(
				what.variant({
					first: false,
				}),
				{
					first: what.token([
						"snapper.nav.edge.enabled",
					]),
				},
			),
			def.rule(
				what.variant({
					last: true,
				}),
				{
					last: what.token([
						"snapper.nav.edge.disabled",
					]),
				},
			),
			def.rule(
				what.variant({
					last: false,
				}),
				{
					last: what.token([
						"snapper.nav.edge.enabled",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
			orientation: "vertical",
			align: "right",
			active: false,
			first: false,
			last: false,
		}),
	}),
);

export type SnapperNavCls = typeof SnapperNavCls;

export namespace SnapperNavCls {
	export type Props<P = unknown> = Cls.Props<SnapperNavCls, P>;
}
