import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IconCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"root",
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
					root: what.css([
						"text-sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.css([
						"text-sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.css([
						"text-base",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					root: what.css([
						"text-lg",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xl",
				}),
				{
					root: what.css([
						"text-xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "2xl",
				}),
				{
					root: what.css([
						"text-2xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "3xl",
				}),
				{
					root: what.css([
						"text-3xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "4xl",
				}),
				{
					root: what.css([
						"text-4xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "5xl",
				}),
				{
					root: what.css([
						"text-5xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "6xl",
				}),
				{
					root: what.css([
						"text-6xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "7xl",
				}),
				{
					root: what.css([
						"text-7xl",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "8xl",
				}),
				{
					root: what.css([
						"text-8xl",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"pointer-events-none",
						"cursor-not-allowed",
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

export type IconCls = typeof IconCls;

export namespace IconCls {
	export type Props<P = unknown> = Component<IconCls, P>;
}
