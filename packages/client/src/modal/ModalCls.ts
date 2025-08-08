import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ModalCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"target",
			"modal",
		],
		variant: {
			disabled: [
				"bool",
			],
			loading: [
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
						"bg-slate-400/75",
						"backdrop-blur-xs",
						"flex",
						"justify-center",
						"py-12",
					],
				},
				target: {
					class: [],
				},
				modal: {
					class: [
						"bg-white",
						"rounded-lg",
						"shadow-lg",
						"p-4",
						"max-h-full",
						"h-fit",
						"flex",
						"flex-col",
						"gap-2",
						"w-2/3",
					],
				},
			}),
			rule(
				{
					disabled: true,
				},
				{
					base: {
						class: [
							"pointer-events-none",
							"cursor-not-allowed",
						],
					},
				},
			),
			rule(
				{
					loading: true,
				},
				{
					base: {
						class: [
							"pointer-events-none",
							"opacity-50",
						],
					},
				},
			),
		],
		defaults: {
			disabled: false,
			loading: false,
		},
	},
);

export type ModalCls = typeof ModalCls;

export namespace ModalCls {
	export type Props<P = unknown> = Component<ModalCls, P>;
}
