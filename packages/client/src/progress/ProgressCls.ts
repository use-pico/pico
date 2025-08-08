¬import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ProgressCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"progress",
		],
		variant: {
			size: [
				"xs",
				"sm",
				"md",
				"lg",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule }) => [
			root({
				base: {
					class: [
						"h-full",
						"w-full",
						"bg-slate-200",
						"rounded-sm",
						"transition-all",
					],
				},
				progress: {
					class: [
						"h-full",
						"bg-blue-400",
						"rounded-sm",
						"leading-none",
						"transition-all",
					],
				},
			}),
			rule(
				{
					size: "xs",
				},
				{
					base: {
						class: [
							"h-0.5",
						],
					},
				},
			),
			rule(
				{
					size: "sm",
				},
				{
					base: {
						class: [
							"h-1",
						],
					},
				},
			),
			rule(
				{
					size: "md",
				},
				{
					base: {
						class: [
							"h-2",
						],
					},
				},
			),
			rule(
				{
					size: "lg",
				},
				{
					base: {
						class: [
							"h-4",
						],
					},
				},
			),
		],
		defaults: {
			size: "md",
		},
	},
);
export type ProgressCls = typeof ProgressCls;

export namespace ProgressCls {
	export type Props<P = unknown> = Component<typeof ProgressCls, P>;
}
