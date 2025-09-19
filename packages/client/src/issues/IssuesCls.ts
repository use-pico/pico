import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const IssuesCls = contract(PicoCls.contract)
	.slot("item")
	.variant("type", [
		"info",
		"warning",
		"error",
	])
	.def()
	.root({
		item: {
			class: [
				"Issues-item",
				"text-md",
			],
			token: [
				"border.default",
				"round.default",
			],
		},
	})
	.rule(
		{
			type: "info",
		},
		{
			item: {
				token: [
					"tone.primary.light.text",
					"tone.primary.light.bg",
					"tone.primary.light.border",
				],
			},
		},
	)
	.rule(
		{
			type: "warning",
		},
		{
			item: {
				token: [
					"tone.secondary.light.text",
					"tone.secondary.light.bg",
					"tone.secondary.light.border",
				],
			},
		},
	)
	.rule(
		{
			type: "error",
		},
		{
			item: {
				token: [
					"tone.danger.light.text",
					"tone.danger.light.bg",
					"tone.danger.light.border",
				],
			},
		},
	)
	.defaults({
		tone: "primary",
		theme: "light",
		type: "info",
	})
	.cls();

export type IssuesCls = typeof IssuesCls;

export namespace IssuesCls {
	export type Props<P = unknown> = Cls.Props<IssuesCls, P>;
}
