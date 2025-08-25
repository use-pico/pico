import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ModalCls = PicoCls.extend(
	{
		tokens: [],
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
			size: [
				"sm",
				"md",
				"lg",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				base: what.both(
					[
						"backdrop-blur-xs",
						"flex",
						"justify-center",
						"py-12",
					],
					[
						"tone.neutral.light.bg",
						"focus.off",
					],
				),
				target: what.css([]),
				modal: what.both(
					[
						"bg-white",
						"shadow-lg",
						"p-4",
						"max-h-full",
						"h-fit",
						"flex",
						"flex-col",
						"gap-2",
					],
					[
						"round.default",
						"focus.off",
					],
				),
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
			// Size variants
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					modal: what.css([
						"w-1/3",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					modal: what.css([
						"w-2/3",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					modal: what.css([
						"w-4/5",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
			loading: false,
			size: "md",
		}),
	}),
);

export type ModalCls = typeof ModalCls;

export namespace ModalCls {
	export type Props<P = unknown> = Component<ModalCls, P>;
}
