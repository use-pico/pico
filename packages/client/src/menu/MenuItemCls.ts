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
			type: [
				"main",
				"sub",
				"level",
			],
			vertical: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"inline-flex",
						"flex-row",
						"gap-2",
						"items-center",
						"border-transparent",
						"transition-all",
						"duration-200",
						"cursor-pointer",
						"w-fit",
					],
					[
						"border.default",
						"round.default",
						"scale.default",
						"padding.md",
					],
				),
				items: what.both(
					[
						"flex",
						"flex-col",
						"gap-2",
					],
					[
						"border.default",
						"round.default",
						"shadow.default",
						"square.lg",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
						"tone.subtle.light.shadow",
					],
				),
			}),
			def.rule(
				what.variant({
					type: "main",
					active: false,
				}),
				{
					root: what.token([
						"tone.primary.light.text",
						"tone.primary.light.text:hover",
						"tone.primary.light.bg:hover",
						"tone.primary.light.border:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "main",
					active: true,
				}),
				{
					root: what.token([
						"tone.primary.light.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
					]),
				},
			),
			// Sub type variants
			def.rule(
				what.variant({
					type: "sub",
					active: false,
				}),
				{
					root: what.token([
						"tone.secondary.light.text",
						"tone.secondary.light.text:hover",
						"tone.secondary.light.bg:hover",
						"tone.secondary.light.border:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "sub",
					active: true,
				}),
				{
					root: what.token([
						"tone.secondary.light.text",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
					]),
				},
			),
			// Level type variants
			def.rule(
				what.variant({
					type: "level",
					active: false,
				}),
				{
					root: what.token([
						"tone.subtle.light.text",
						"tone.subtle.light.text:hover",
						"tone.subtle.light.bg:hover",
						"tone.subtle.light.border:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "level",
					active: true,
				}),
				{
					root: what.token([
						"tone.subtle.light.text",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
					]),
				},
			),
			// Hover effects for non-active states
			def.rule(
				what.variant({
					type: "main",
					active: false,
				}),
				{
					root: what.css([
						"hover:tone.primary.light.bg:hover",
						"hover:tone.primary.light.border:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "sub",
					active: false,
				}),
				{
					root: what.css([
						"hover:tone.secondary.light.bg:hover",
						"hover:tone.secondary.light.border:hover",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "level",
					active: false,
				}),
				{
					root: what.css([
						"hover:tone.subtle.light.bg:hover",
						"hover:tone.subtle.light.border:hover",
					]),
				},
			),
			// Original active rule (kept for backward compatibility)
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
			type: "main",
			vertical: false,
		}),
	}),
);

export type MenuItemCls = typeof MenuItemCls;

export namespace MenuItemCls {
	export type Props<P = unknown> = Component<MenuItemCls, P>;
}
