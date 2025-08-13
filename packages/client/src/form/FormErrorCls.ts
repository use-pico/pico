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
				error: what.css([
					"flex",
					"flex-row",
					"gap-1",
					"items-center",
					"text-red-600",
					"p-2",
				]),
			}),
			def.rule(
				what.variant({
					highlight: true,
				}),
				{
					error: what.css([
						"bg-red-100",
						"p-2",
						"font-bold",
						"border",
						"border-red-200",
						"rounded-md",
						"w-full",
					]),
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
