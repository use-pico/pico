import type { Component } from "@use-pico/cls";
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
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"h-full",
					"w-full",
					"bg-slate-200",
					"rounded-sm",
					"transition-all",
				]),
				progress: what.css([
					"h-full",
					"bg-blue-400",
					"rounded-sm",
					"leading-none",
					"transition-all",
				]),
			}),
			def.rule(
				what.variant({
					size: "xs",
				}),
				{
					base: what.css([
						"h-0.5",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					base: what.css([
						"h-1",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					base: what.css([
						"h-2",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					base: what.css([
						"h-4",
					]),
				},
			),
		],
		defaults: def.defaults({
			size: "md",
		}),
	}),
);

export type ProgressCls = typeof ProgressCls;

export namespace ProgressCls {
	export type Props<P = unknown> = Component<typeof ProgressCls, P>;
}
