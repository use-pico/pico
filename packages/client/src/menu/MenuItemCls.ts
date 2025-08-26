import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MenuItemCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"items",
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
				root: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"px-2",
						"py-1",
						"border-transparent",
						"transition-all",
						"duration-200",
						"cursor-pointer",
					],
					[
						"border.default",
						"round.default",
						"scale.default",
						"tone.primary.light.text:hover",
						"tone.primary.light.bg:hover",
						"tone.primary.light.border:hover",
						"tone.primary.light.shadow:hover",
					],
				),
				items: what.both(
					[
						"flex",
						"flex-col",
						"w-max",
						"gap-2",
						"px-4",
						"py-4",
					],
					[
						"border.default",
						"round.default",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
						"tone.subtle.light.shadow",
						"shadow.md",
					],
				),
			}),
			def.rule(
				what.variant({
					active: true,
					inner: false,
				}),
				{
					root: what.token([
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
					root: what.token([
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
					root: what.both(
						[],
						[
							"tone.neutral.light.text",
							"tone.neutral.light.bg",
							"tone.neutral.light.border",
							"tone.neutral.light.shadow",
						],
					),
				},
			),
			def.rule(
				what.variant({
					subtle: true,
				}),
				{
					root: what.token([
						"tone.subtle.light.text",
						"tone.subtle.light.text:hover",
						"tone.subtle.light.bg",
						"tone.subtle.light.bg:hover",
						"tone.subtle.light.border",
						"tone.subtle.light.shadow",
						"tone.subtle.light.border:hover",
						"tone.subtle.light.shadow:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					active: true,
					subtle: true,
				}),
				{
					root: what.token([
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
					root: what.css([
						"scale-105",
					]),
				},
			),
			def.rule(
				what.variant({
					vertical: true,
				}),
				{
					root: what.css([
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

export type MenuItemCls = typeof MenuItemCls;

export namespace MenuItemCls {
	export type Props<P = unknown> = Component<MenuItemCls, P>;
}
