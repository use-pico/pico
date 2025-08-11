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
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"bg-slate-400/75",
					"backdrop-blur-xs",
					"flex",
					"justify-center",
					"py-12",
				]),
				target: what.css([]),
				modal: what.css([
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
				]),
			}),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"pointer-events-none",
						"cursor-not-allowed",
					]),
				},
			),
			def.rule(
				what.variant({
					loading: true,
				}),
				{
					base: what.css([
						"pointer-events-none",
						"opacity-50",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
			loading: false,
		}),
	}),
);

export type ModalCls = typeof ModalCls;

export namespace ModalCls {
	export type Props<P = unknown> = Component<ModalCls, P>;
}
