import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LinkToCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"justify-between",
						"px-2",
						"py-0.5",
						"focus:outline-hidden",
						"w-fit",
						"truncate",
						"border-transparent",
						"transition-all",
					],
					[
						"round.default",
						"scale.default",
						"border.default",
						"tone.link.light.text",
						"tone.link.light.text:hover",
						"tone.link.light.bg:hover",
						"tone.link.light.border:hover",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type LinkToCls = typeof LinkToCls;

export namespace LinkToCls {
	export type Props<P = unknown> = Cls.Props<typeof LinkToCls, P>;
}
