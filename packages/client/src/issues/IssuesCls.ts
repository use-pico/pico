import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IssuesCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"item",
		],
		variant: {
			type: [
				"info",
				"warning",
				"error",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				item: what.css([
					"p-4",
					"text-md",
					"border",
					"rounded-md",
				]),
			}),
			def.rule(
				what.variant({
					type: "info",
				}),
				{
					item: what.token([
						"primary.color.text-dark",
						"primary.color.bg-light",
						"primary.color.border-light",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "warning",
				}),
				{
					item: what.token([
						"secondary.color.text-dark",
						"secondary.color.bg-light",
						"secondary.color.border-light",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "error",
				}),
				{
					item: what.token([
						"danger.color.text-dark",
						"danger.color.bg-light",
						"danger.color.border-light",
					]),
				},
			),
		],
		defaults: def.defaults({
			type: "info",
		}),
	}),
);

export type IssuesCls = typeof IssuesCls;

export namespace IssuesCls {
	export type Props<P = unknown> = Component<IssuesCls, P>;
}
