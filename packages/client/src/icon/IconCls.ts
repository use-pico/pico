import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IconCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {
			size: [
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
				"2xl",
				"3xl",
				"4xl",
				"5xl",
				"6xl",
				"7xl",
				"8xl",
			],
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.rule(
				what.variant({
					size: "xs",
				}),
				{
					base: what.css([
						"text-sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					base: what.css([
						"text-sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					base: what.css([
						"text-base",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					base: what.css([
						"text-lg",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xl",
				}),
				{
					base: what.css([
						"text-xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "2xl",
				}),
				{
					base: what.css([
						"text-2xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "3xl",
				}),
				{
					base: what.css([
						"text-3xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "4xl",
				}),
				{
					base: what.css([
						"text-4xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "5xl",
				}),
				{
					base: what.css([
						"text-5xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "6xl",
				}),
				{
					base: what.css([
						"text-6xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "7xl",
				}),
				{
					base: what.css([
						"text-7xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "8xl",
				}),
				{
					base: what.css([
						"text-8xl",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"pointer-events-none",
						"cursor-not-allowed",
						"text-gray-400",
						"opacity-50",
					]),
				},
			),
		],
		defaults: def.defaults({
			size: "xl",
			disabled: false,
		}),
	}),
);

export namespace IconCls {
	export type Props<P = unknown> = Component<typeof IconCls, P>;
}
