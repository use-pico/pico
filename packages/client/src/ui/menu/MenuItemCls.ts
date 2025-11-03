import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const MenuItemCls = contract(PicoCls.contract)
	.slots([
		"root",
		"items",
	])
	.bool("active")
	.variant("type", [
		"main",
		"sub",
		"level",
	])
	.bool("vertical")
	.def()
	.root({
		root: {
			class: [
				"MenuItem-root",
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
			token: [
				"border.default",
				"round.default",
				"scale.sm",
				"padding.md",
			],
		},
		items: {
			class: [
				"MenuItem-items",
				"flex",
				"flex-col",
				"gap-2",
			],
			token: [
				"border.default",
				"round.default",
				"shadow.default",
				"square.lg",
				"tone.subtle.light.bg",
				"tone.subtle.light.border",
				"tone.subtle.light.shadow",
			],
		},
	})
	// Main type
	.rule(
		{
			type: "main",
			active: false,
		},
		{
			root: {
				token: [
					"tone.primary.light.text",
					"tone.primary.light.text:hover",
					"tone.primary.light.bg:hover",
					"tone.primary.light.border:hover",
				],
			},
		},
	)
	.rule(
		{
			type: "main",
			active: true,
		},
		{
			root: {
				token: [
					"tone.primary.light.text",
					"tone.primary.light.bg",
					"tone.primary.light.border",
				],
			},
		},
	)
	// Sub type
	.rule(
		{
			type: "sub",
			active: false,
		},
		{
			root: {
				token: [
					"tone.secondary.light.text",
					"tone.secondary.light.text:hover",
					"tone.secondary.light.bg:hover",
					"tone.secondary.light.border:hover",
				],
			},
		},
	)
	.rule(
		{
			type: "sub",
			active: true,
		},
		{
			root: {
				token: [
					"tone.secondary.light.text",
					"tone.secondary.light.bg",
					"tone.secondary.light.border",
				],
			},
		},
	)
	// Level type
	.rule(
		{
			type: "level",
			active: false,
		},
		{
			root: {
				token: [
					"tone.subtle.light.text",
					"tone.subtle.light.text:hover",
					"tone.subtle.light.bg:hover",
					"tone.subtle.light.border:hover",
				],
			},
		},
	)
	.rule(
		{
			type: "level",
			active: true,
		},
		{
			root: {
				token: [
					"tone.subtle.light.text",
					"tone.subtle.light.bg",
					"tone.subtle.light.border",
				],
			},
		},
	)
	.match("vertical", true, {
		root: {
			class: [
				"w-full",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		active: false,
		type: "main",
		vertical: false,
	})
	.cls();

export type MenuItemCls = typeof MenuItemCls;

export namespace MenuItemCls {
	export type Props<P = unknown> = Cls.Props<MenuItemCls, P>;
}
