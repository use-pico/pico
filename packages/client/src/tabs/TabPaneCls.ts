import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabPaneCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
		],
		variant: {
			hidden: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([]),
			}),
			def.rule(
				what.variant({
					hidden: true,
				}),
				{
					base: what.css([
						"hidden",
					]),
				},
			),
		],
		defaults: def.defaults({
			hidden: false,
		}),
	}),
);

export type TabPaneCls = typeof TabPaneCls;

export namespace TabPaneCls {
	export type Props<P = unknown> = Component<TabPaneCls, P>;
}
