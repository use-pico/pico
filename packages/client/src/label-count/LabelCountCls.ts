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
	{
		token: {},
		rules: ({ root }) => [
			root({
				base: {
					class: [
						"flex",
						"flex-row",
						"items-center",
						"w-fit",
						"gap-2",
					],
				},
				label: {
					class: [],
				},
			}),
		],
		defaults: {},
	},
);

export type LabelCountCls = typeof LabelCountCls;

export namespace LabelCountCls {
	export type Props<P = unknown> = Component<typeof LabelCountCls, P>;
}
