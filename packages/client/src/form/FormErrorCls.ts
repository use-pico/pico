import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormErrorCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"error",
		],
		variant: {
			highlight: [
				"bool",
			],
			compact: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule }) => [
			root({
				base: {
					class: [
						"flex",
						"flex-col",
						"gap-2",
					],
				},
				error: {
					class: [
						"flex",
						"flex-row",
						"gap-1",
						"items-center",
						"text-red-600",
						"p-2",
					],
				},
			}),
			rule(
				{
					highlight: true,
				},
				{
					error: {
						class: [
							"bg-red-100",
							"p-2",
							"font-bold",
							"border",
							"border-red-200",
							"rounded-md",
							"w-full",
						],
					},
				},
			),
			rule(
				{
					compact: true,
				},
				{
					error: {
						class: [
							"p-0",
						],
					},
				},
			),
		],
		defaults: {
			highlight: false,
			compact: false,
		},
	},
);

export type FormErrorCls = typeof FormErrorCls;

export namespace FormErrorCls {
	export type Props<P = unknown> = Component<typeof FormErrorCls, P>;
}
