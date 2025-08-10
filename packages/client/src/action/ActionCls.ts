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
				{
					disabled: true,
				},
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
				{
					loading: true,
				},
				{
					action: what.css([
						"pointer-events-none",
					]),
				},
			),
			def.rule(
				{
					active: true,
				},
				{
					action: what.css([
						"active",
						"shadow-md",
					]),
				},
			),
			def.rule(
				{
					variant: "primary",
				},
				{
					action: what.css([
						"pico--action-color-danger",
					]),
				},
			),
			def.rule(
				{
					variant: "secondary",
				},
				{
					action: what.css([
						"pico--action-color-secondary",
					]),
				},
			),
			def.rule(
				{
					variant: "danger",
				},
				{
					action: what.css([
						"pico--action-color-danger",
					]),
				},
			),
			def.rule(
				{
					variant: "danger-light",
				},
				{
					action: what.css([
						"pico--action-color-danger-light",
					]),
				},
			),
			def.rule(
				{
					variant: "subtle",
				},
				{
					action: what.css([
						"pico--action-color-subtle",
					]),
				},
			),
			def.rule(
				{
					variant: "light",
				},
				{
					action: what.css([
						"pico--action-color-light",
					]),
				},
			),
			def.rule(
				{
					variant: "neutral",
				},
				{
					action: what.css([
						"pico--action-color-neutral",
					]),
				},
			),
			def.rule(
				{
					borderless: true,
				},
				{
					action: what.css([
						"border-none",
					]),
				},
			),
		],
		defaults: {
			disabled: false,
			loading: false,
			active: false,
			variant: "subtle",
			borderless: false,
		},
	}),
);

export type ActionCls = typeof ActionCls;

export namespace ActionCls {
	export type Props<P = unknown> = Component<ActionCls, P>;
}
