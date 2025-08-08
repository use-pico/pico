import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LinkToCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({
				base: {
					class: [
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"justify-between",
						"text-blue-500",
						"rounded-sm",
						"px-1",
						"py-0.5",
						"hover:text-blue-700",
						"focus:outline-hidden",
						"w-fit",
						"truncate",
					],
				},
			}),
		],
		defaults: {},
	},
);

export type LinkToCls = typeof LinkToCls;

export namespace LinkToCls {
	export type Props<P = unknown> = Component<typeof LinkToCls, P>;
}
