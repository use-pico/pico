import type { Cls } from "@use-pico/cls";
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
						"tone.neutral.light.text:hover",
					],
				),
				input: what.both(
					[
						"pl-8",
						"w-full",
					],
					[
						"border.default",
						"round.default",
						"size.md",
						"shadow.default",
						"tone.neutral.light.bg",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.bg:focus",
						"tone.neutral.light.text",
						"tone.neutral.light.text:hover",
						"tone.neutral.light.border",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
						"focus.off",
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
	export type Props<P = unknown> = Cls.Props<FulltextCls, P>;
}
