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
	{
		token: {},
		rules: ({ root, rule, what }) => [
			root({
				base: what.css([
					"pico--menu-link",
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
					"hover:text-(--color-text-hover)",
					"hover:bg-(--color-bg-hover)",
					"hover:border-(--color-border-hover)",
				]),
			}),
			rule(
				{
					active: true,
					inner: false,
				},
				{
					base: what.css([
						"bg-(--color-active-bg)",
						"border-(--color-active-border)",
						"hover:border-(--color-active-border-hover)",
						"hover:text-(--color-active-text-hover)",
						"text-(--color-active-text)",
					]),
				},
			),
			rule(
				{
					active: true,
					inner: true,
				},
				{
					base: what.css([
						"border-transparent",
						"bg-(--color-active-bg)",
						"hover:border-(--color-active-border-hover)",
						"hover:text-(--color-active-text-hover)",
						"text-(--color-active-text)",
					]),
				},
			),
			rule(
				{
					subtle: true,
				},
				{
					base: what.css([
						"hover:bg-slate-50",
						"hover:border-slate-300",
						"hover:text-slate-600",
					]),
				},
			),
			rule(
				{
					active: true,
					subtle: true,
				},
				{
					base: what.css([
						"bg-slate-100",
						"border-slate-400",
					]),
				},
			),
			rule(
				{
					vertical: true,
				},
				{
					base: what.css([
						"w-full",
					]),
				},
			),
		],
		defaults: {
			active: false,
			inner: false,
			subtle: false,
			vertical: false,
		},
	},
);

export type MenuLinkCls = typeof MenuLinkCls;

export namespace MenuLinkCls {
	export type Props<P = unknown> = Component<MenuLinkCls, P>;
}
