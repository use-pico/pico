import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LinkToCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"justify-between",
						"rounded-sm",
						"px-1",
						"py-0.5",
						"focus:outline-hidden",
						"w-fit",
						"truncate",
					],
					[
						"tone.neutral.light.text",
						"tone.neutral.light.text:hover",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type LinkToCls = typeof LinkToCls;

export namespace LinkToCls {
	export type Props<P = unknown> = Component<typeof LinkToCls, P>;
}
