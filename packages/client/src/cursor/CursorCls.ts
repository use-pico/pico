import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const CursorCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"pages",
			"pages-wrapper",
			"sums",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"inline-flex",
					"items-center",
					"gap-2",
				]),
				pages: what.css([
					"flex",
					"items-center",
					"justify-center",
					"gap-2",
				]),
				sums: what.css([
					"inline-flex",
					"items-center",
					"gap-2",
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
