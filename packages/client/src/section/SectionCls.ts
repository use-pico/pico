import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const SectionCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"title",
			"items",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"Section-root",
						"flex-1",
					],
					[
						"square.md",
					],
				),
				title: what.both(
					[
						"Section-title",
						"border-b-2",
					],
					[
						"round.default",
						"tone.neutral.light.border",
					],
				),
				items: what.css([
					"Section-items",
					"flex",
					"flex-col",
					"gap-2",
				]),
			}),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type SectionCls = typeof SectionCls;

export namespace SectionCls {
	export type Props<P = unknown> = Cls.Props<SectionCls, P>;
}
