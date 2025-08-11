import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ActionCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"action",
		],
		variant: {
			disabled: [
				"bool",
			],
			loading: [
				"bool",
			],
			active: [
				"bool",
			],
			variant: [
				"primary",
				"secondary",
				"danger",
				"danger-light",
				"subtle",
				"light",
				"neutral",
			],
			borderless: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"w-fit",
					"h-fit",
				]),
				action: what.css([
					"border",
					"cursor-pointer",
					"flex",
					"gap-2",
					"group",
					"h-fit",
					"hover:shadow-md",
					"items-center",
					"justify-center",
					"p-1",
					"rounded-sm",
					"rounded",
					"transition-all",
					"w-fit",
					"bg-(--pico-color-bg-default)",
					"hover:bg-(--pico-color-bg-hover)",
					"border-(--pico-color-border-default)",
					"hover:border-(--pico-color-border-hover)",
					"shadow-(--pico-color-shadow-default)",
					"hover:shadow-(--pico-color-shadow-hover)",
					"text-(--pico-color-text-default)",
					"hover:text-(--pico-color-text-hover)",
				]),
			}),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"opacity-50",
						"cursor-not-allowed",
					]),
					action: what.css([
						"pointer-events-none",
					]),
				},
			),
			def.rule(
				what.variant({
					loading: true,
				}),
				{
					action: what.css([
						"pointer-events-none",
					]),
				},
			),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					action: what.css([
						"active",
						"shadow-md",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "primary",
				}),
				{
					action: what.css([
						"pico--action-color-danger",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "secondary",
				}),
				{
					action: what.css([
						"pico--action-color-secondary",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "danger",
				}),
				{
					action: what.css([
						"pico--action-color-danger",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "danger-light",
				}),
				{
					action: what.css([
						"pico--action-color-danger-light",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "subtle",
				}),
				{
					action: what.css([
						"pico--action-color-subtle",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "light",
				}),
				{
					action: what.css([
						"pico--action-color-light",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "neutral",
				}),
				{
					action: what.css([
						"pico--action-color-neutral",
					]),
				},
			),
			def.rule(
				what.variant({
					borderless: true,
				}),
				{
					action: what.css([
						"border-none",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
			loading: false,
			active: false,
			variant: "subtle",
			borderless: false,
		}),
	}),
);

export type ActionCls = typeof ActionCls;

export namespace ActionCls {
	export type Props<P = unknown> = Component<ActionCls, P>;
}
