import { cls } from "@use-pico/common";

export const IssuesCls = cls({
	slot: {
		item: [
			"p-4",
			"text-md",
		],
	},
	variant: {
		type: {
			info: [],
			warning: [],
			error: [],
		},
	},
	match: [
		{
			if: {
				type: "info",
			},
			do: {
				item: [
					"bg-blue-100",
					"border-blue-400",
					"text-blue-700",
				],
			},
		},
		{
			if: {
				type: "warning",
			},
			do: {
				item: [
					"bg-amber-100",
					"border-amber-400",
					"text-amber-700",
				],
			},
		},
		{
			if: {
				type: "error",
			},
			do: {
				item: [
					"bg-red-100",
					"border-red-400",
					"text-red-700",
				],
			},
		},
	],
	defaults: {
		type: "info",
	},
});

export namespace IssuesCls {
	export type Props<P = unknown> = cls.Props<typeof IssuesCls, P>;
}
