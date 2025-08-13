import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const JustDropZoneCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"label",
			"zone",
		],
		variant: {
			active: [
				"bool",
			],
			rejected: [
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
					"items-center",
					"justify-center",
					"w-full",
				]),
				label: what.css([
					"flex",
					"flex-col",
					"items-center",
					"justify-center",
					"w-full",
					"h-64",
					"border-2",
					"border-gray-300",
					"border-dashed",
					"rounded-lg",
					"cursor-pointer",
					"bg-gray-50",
					"hover:bg-gray-100",
				]),
				zone: what.css([
					"flex",
					"flex-col",
					"items-center",
					"justify-center",
					"pt-5",
					"pb-6",
					"text-slate-500",
				]),
			}),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					label: what.css([
						"text-blue-400",
					]),
					zone: what.css([
						"text-blue-400",
					]),
				},
			),
			def.rule(
				what.variant({
					rejected: true,
				}),
				{
					label: what.css([
						"text-red-400",
					]),
					zone: what.css([
						"text-red-400",
					]),
				},
			),
		],
		defaults: def.defaults({
			active: false,
			rejected: false,
		}),
	}),
);

export type JustDropZoneCls = typeof JustDropZoneCls;

export namespace JustDropZoneCls {
	export type Props<P = unknown> = Component<JustDropZoneCls, P>;
}
