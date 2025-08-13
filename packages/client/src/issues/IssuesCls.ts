import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IssuesCls = PicoCls.extend(
	{
		tokens: [],
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
						"tone.primary.light.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "warning",
				}),
				{
					item: what.token([
						"tone.secondary.light.text",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
					]),
				},
			),
			def.rule(
				what.variant({
					type: "error",
				}),
				{
					item: what.token([
						"tone.danger.light.text",
						"tone.danger.light.bg",
						"tone.danger.light.border",
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
