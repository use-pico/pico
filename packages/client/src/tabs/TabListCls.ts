import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabListCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"tabs",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
				]),
				tabs: what.css([
					"flex",
					"flex-row",
					"items-center",
					"gap-1",
					"mb-4",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type TabListCls = typeof TabListCls;

export namespace TabListCls {
	export type Props<P = unknown> = Component<TabListCls, P>;
}
