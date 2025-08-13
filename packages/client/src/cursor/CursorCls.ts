import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const CursorCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"sums",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"items-center",
					"justify-between",
					"gap-2",
				]),
				sums: what.css([
					"flex",
					"items-center",
					"gap-2",
					"text-sm",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type CursorCls = typeof CursorCls;

export namespace CursorCls {
	export type Props<P = unknown> = Component<CursorCls, P>;
}
