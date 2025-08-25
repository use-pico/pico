import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MenuLinkCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
		],
		variant: {
			active: [
				"bool",
			],
			inner: [
				"bool",
			],
			subtle: [
				"bool",
			],
			vertical: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"px-2",
						"py-1",
						"border-transparent",
						"transition-all",
					],
					[
						"border.default",
						"round.default",
						"scale.default",
					],
				),
			}),
			def.rule(
				what.variant({
					active: true,
					inner: false,
				}),
				{
					base: what.token([
						"tone.primary.light.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
						"tone.primary.light.shadow",
					]),
				},
			),
			def.rule(
				what.variant({
					active: false,
				}),
				{
					base: what.token([
						"tone.primary.light.text:hover",
						"tone.primary.light.bg:hover",
						"tone.primary.light.border:hover",
						"tone.primary.light.shadow:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					active: true,
					inner: true,
				}),
				{
					base: what.both(
						[
							"border-transparent",
						],
						[
							"tone.primary.dark.text",
							"tone.primary.dark.bg",
							"tone.primary.dark.border",
							"tone.primary.dark.shadow",
						],
					),
				},
			),
			def.rule(
				what.variant({
					subtle: true,
				}),
				{
					base: what.token([
						"tone.neutral.light.text",
						"tone.neutral.light.text:hover",
						"tone.neutral.light.bg",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.border",
						"tone.neutral.light.shadow",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					active: true,
					subtle: true,
				}),
				{
					base: what.token([
						"tone.neutral.dark.text",
						"tone.neutral.dark.text:hover",
						"tone.neutral.dark.bg",
						"tone.neutral.dark.bg:hover",
						"tone.neutral.dark.border",
						"tone.neutral.dark.border:hover",
						"tone.neutral.dark.shadow",
						"tone.neutral.dark.shadow:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					base: what.css([
						"scale-105",
					]),
				},
			),
			def.rule(
				what.variant({
					vertical: true,
				}),
				{
					base: what.css([
						"w-full",
					]),
				},
			),
		],
		defaults: def.defaults({
			active: false,
			inner: false,
			subtle: false,
			vertical: false,
		}),
	}),
);

export type MenuLinkCls = typeof MenuLinkCls;

export namespace MenuLinkCls {
	export type Props<P = unknown> = Component<MenuLinkCls, P>;
}
