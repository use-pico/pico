import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LabelCountCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"label",
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
					"w-fit",
					"gap-2",
				]),
				label: what.css([]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type LabelCountCls = typeof LabelCountCls;

export namespace LabelCountCls {
	export type Props<P = unknown> = Component<LabelCountCls, P>;
}
