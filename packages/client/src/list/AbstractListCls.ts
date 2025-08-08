import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AbstractListCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"root",
			"body",
			"items",
		],
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({
				root: {
					class: [],
				},
				body: {
					class: [],
				},
				items: {
					class: [],
				},
			}),
		],
		defaults: {},
	},
);

export type AbstractListCls = typeof AbstractListCls;

export namespace AbstractListCls {
	export type Props<P = unknown> = Component<typeof AbstractListCls, P>;
}
