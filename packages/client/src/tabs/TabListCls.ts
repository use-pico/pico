import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabListCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"tabs",
		],
		variant: {},
	},
	{
		token: {},
		rules: ({ root, classes }) => [
			root({
				base: classes([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
				]),
				tabs: classes([
					"flex",
					"flex-row",
					"items-center",
					"gap-1",
					"mb-4",
				]),
			}),
		],
		defaults: {},
	},
);

export type TabListCls = typeof TabListCls;

export namespace TabListCls {
	export type Props<P = unknown> = Component<TabListCls, P>;
}
