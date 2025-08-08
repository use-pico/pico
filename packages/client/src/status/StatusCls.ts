import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const StatusCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"title",
			"message",
			"body",
		],
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({
				base: {
					class: [
						"w-full",
						"flex",
						"flex-col",
						"items-center",
						"justify-center",
					],
				},
				title: {
					class: [
						"text-xl",
						"text-bold",
						"w-full",
						"text-center",
					],
				},
				message: {
					class: [
						"text-base",
						"text-slate-500",
						"w-full",
						"text-center",
					],
				},
				body: {
					class: [
						"pt-2",
						"w-full",
					],
				},
			}),
		],
		defaults: {},
	},
);

export type StatusCls = typeof StatusCls;

export namespace StatusCls {
	export type Props<P = unknown> = Component<typeof StatusCls, P>;
}
