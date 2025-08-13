import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MoreCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"item",
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
					"flex-wrap",
					"items-center",
					"gap-2",
					"text-sm",
					"font-semibold",
				]),
				item: what.css([
					"border",
					"border-blue-200",
					"bg-blue-50",
					"rounded-md",
					"px-2",
					"py-1",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);
export type MoreCls = typeof MoreCls;

export namespace MoreCls {
	export type Props<P = unknown> = Component<MoreCls, P>;
}
