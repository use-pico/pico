import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FulltextCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"search",
			"input",
			"clear",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"relative",
					"w-full",
				]),
				search: what.both(
					[
						"absolute",
						"inset-y-0",
						"left-2",
						"flex",
						"items-center",
						"pointer-events-none",
					],
					[
						"tone.neutral.light.text",
					],
				),
				input: what.both(
					[
						"pl-8",
						"py-1",
						"w-full",
						"text-sm",
						"block",
					],
					[
						"border.default",
						"round.default",
						"tone.neutral.light.bg",
						"tone.neutral.light.text:hover",
						"tone.neutral.light.border",
						"tone.neutral.light.border:hover",
					],
				),
				clear: what.both(
					[
						"absolute",
						"inset-y-0",
						"right-2",
						"flex",
						"items-center",
						"cursor-pointer",
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

export type FulltextCls = typeof FulltextCls;

export namespace FulltextCls {
	export type Props<P = unknown> = Component<FulltextCls, P>;
}
