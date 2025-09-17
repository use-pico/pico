import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabPaneCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
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
				root: what.css([
					"TabPane-root",
				]),
			}),
			def.rule(
				what.variant({
					hidden: true,
				}),
				{
					root: what.css([
						"hidden",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
			hidden: false,
		}),
	}),
);

export type TabPaneCls = typeof TabPaneCls;

export namespace TabPaneCls {
	export type Props<P = unknown> = Cls.Props<TabPaneCls, P>;
}
