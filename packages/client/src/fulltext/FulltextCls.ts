import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FulltextCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
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
				root: what.css([
					"Fulltext-root",
					"relative",
					"w-full",
				]),
				search: what.both(
					[
						"Fulltext-search",
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
						"Fulltext-input",
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
						"Fulltext-clear",
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
		defaults: def.defaults({
			tone: "unset",
			theme: "unset",
		}),
	}),
);

export type FulltextCls = typeof FulltextCls;

export namespace FulltextCls {
	export type Props<P = unknown> = Cls.Props<FulltextCls, P>;
}
