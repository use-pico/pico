import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DeleteControlCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"content",
			"footer",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"flex-col",
					"gap-4",
				]),
				content: what.both(
					[
						"text-bold",
						"font-bold",
					],
					[
						"tone.danger.light.text",
					],
				),
				footer: what.css([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-4",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type DeleteControlCls = typeof DeleteControlCls;

export namespace DeleteControlCls {
	export type Props<P = unknown> = Component<DeleteControlCls, P>;
}
