import { type Component, variant } from "@use-pico/cls";

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
	rules: ({ root, rule, classes }) => [
		root({
			item: classes([
				"p-4",
				"text-md",
			]),
		}),
		rule(
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
		rule(
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
		rule(
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
