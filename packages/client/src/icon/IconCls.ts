import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IconCls = PicoCls.extend(
	{
		tokens: [],
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
					root: what.token([
						"inner-icon.xs",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "sm",
				}),
				{
					root: what.token([
						"inner-icon.sm",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "md",
				}),
				{
					root: what.token([
						"inner-icon.md",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "lg",
				}),
				{
					root: what.token([
						"inner-icon.lg",
					]),
				},
			),
			def.rule(
				what.variant({
					size: "xl",
				}),
				{
					root: what.token([
						"inner-icon.xl",
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
						"opacity-50",
					]),
				},
			),
		],
		defaults: def.defaults({
			size: "md",
			disabled: false,
		}),
	}),
);

export type IconCls = typeof IconCls;

export namespace IconCls {
	export type Props<P = unknown> = Component<IconCls, P>;
}
