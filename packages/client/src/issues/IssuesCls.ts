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
				]),
			}),
			def.rule(
				what.variant({
					type: "info",
				}),
				{
					item: what.css([
						"bg-blue-100",
						"border-blue-400",
						"text-blue-700",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "warning",
				}),
				{
					item: what.css([
						"bg-amber-100",
						"border-amber-400",
						"text-amber-700",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "error",
				}),
				{
					item: what.css([
						"bg-red-100",
						"border-red-400",
						"text-red-700",
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
