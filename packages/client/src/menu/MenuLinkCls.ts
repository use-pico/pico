import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MenuLinkCls = PicoCls.extend(
	{
		tokens: {},
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
						"rounded-sm",
						"px-2",
						"py-1",
						"border",
						"border-b-2",
						"border-transparent",
					],
					[
						"subtle.color.text-dark-hover",
						"subtle.color.bg-light-hover",
						"subtle.color.border-light-hover",
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
						"subtle.color.text-dark",
						"subtle.color.bg-dark",
						"subtle.color.border-dark",
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
							"subtle.color.text-dark",
							"subtle.color.bg-dark",
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
						"subtle.color.text-dark",
						"subtle.color.bg-light",
						"subtle.color.border-light",
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
						"subtle.color.text-dark",
						"subtle.color.bg-dark",
						"subtle.color.border-dark",
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
