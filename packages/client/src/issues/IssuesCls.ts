import { type Component, classes, match, variant } from "@use-pico/cls";

export const IssuesCls = variant({
	slots: [
		"item",
	],
	variants: {
		type: [
			"info",
			"warning",
			"error",
		],
	},
	rule: [
		match(undefined, {
			item: classes([
				"p-4",
				"text-md",
			]),
		}),
		match(
			{
				type: "info",
			},
			{
				item: classes([
					"bg-blue-100",
					"border-blue-400",
					"text-blue-700",
				]),
			},
		),
		match(
			{
				type: "warning",
			},
			{
				item: classes([
					"bg-amber-100",
					"border-amber-400",
					"text-amber-700",
				]),
			},
		),
		match(
			{
				type: "error",
			},
			{
				item: classes([
					"bg-red-100",
					"border-red-400",
					"text-red-700",
				]),
			},
		),
	],
	defaults: {
		type: "info",
	},
});

export namespace IssuesCls {
	export type Props<P = unknown> = Component<typeof IssuesCls, P>;
}
