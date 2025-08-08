import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DeleteControlCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"content",
			"footer",
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
						"flex-col",
						"gap-4",
					],
				},
				content: {
					class: [
						"text-bold",
						"text-red-500",
						"font-bold",
					],
				},
				footer: {
					class: [
						"flex",
						"flex-row",
						"items-center",
						"justify-between",
						"gap-4",
					],
				},
			}),
		],
		defaults: {},
	},
);

export type DeleteControlCls = typeof DeleteControlCls;

export namespace DeleteControlCls {
	export type Props<P = unknown> = Component<DeleteControlCls, P>;
}
