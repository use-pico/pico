import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AppLayoutCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"header",
			"content",
		],
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({
				base: {
					class: [
						"min-h-screen",
						"flex",
						"flex-col",
					],
				},
				header: {
					class: [
						"flex",
						"flex-row",
						"items-center",
						"bg-slate-50",
						"shadow-xs",
						"border-b",
						"border-b-slate-200",
						"w-full",
						"gap-4",
						"p-4",
					],
				},
				content: {
					class: [
						"grow",
						"h-full",
						"border-b",
						"border-b-slate-200",
						"p-2",
					],
				},
			}),
		],
		defaults: {},
	},
);

export type AppLayoutCls = typeof AppLayoutCls;

export namespace AppLayoutCls {
	export type Props<P = unknown> = Component<typeof AppLayoutCls, P>;
}
