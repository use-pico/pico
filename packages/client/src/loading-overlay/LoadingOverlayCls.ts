import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LoadingOverlayCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {
			show: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule, classes }) => [
			root({
				base: classes([
					"fixed",
					"inset-0",
					"h-full",
					"items-center",
					"justify-center",
					"bg-slate-100",
					"flex",
					"transition-all",
					"duration-200",
					"z-10",
					"pointer-events-none",
					"bg-opacity-0",
					"backdrop-blur-none",
				]),
			}),
			rule(
				{
					show: true,
				},
				{
					base: classes([
						"bg-opacity-50",
						"backdrop-blur-xs",
						"pointer-events-auto",
					]),
				},
			),
		],
		defaults: {
			show: true,
		},
	},
);

export type LoadingOverlayCls = typeof LoadingOverlayCls;

export namespace LoadingOverlayCls {
	export type Props<P = unknown> = Component<LoadingOverlayCls, P>;
}
