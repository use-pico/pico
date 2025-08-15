import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FormErrorCls = PicoCls.extend(
	{
		tokens: [],
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
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"flex-col",
					"gap-2",
				]),
				error: what.both(
					[
						"flex",
						"flex-row",
						"gap-1",
						"items-center",
						"p-2",
					],
					[
						"tone.danger.light.text",
					],
				),
			}),
			def.rule(
				what.variant({
					highlight: true,
				}),
				{
					error: what.both(
						[
							"p-2",
							"font-bold",
							"border",
							"rounded-md",
							"w-full",
						],
						[
							"tone.danger.light.bg",
							"tone.danger.light.border",
						],
					),
				},
			),
			def.rule(
				what.variant({
					compact: true,
				}),
				{
					error: what.css([
						"p-0",
					]),
				},
			),
		],
		defaults: def.defaults({
			highlight: false,
			compact: false,
		}),
	}),
);

export type FormErrorCls = typeof FormErrorCls;

export namespace FormErrorCls {
	export type Props<P = unknown> = Component<FormErrorCls, P>;
}
