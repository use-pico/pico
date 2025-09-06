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
						"flex-1",
					],
					[
						"square.md",
					],
				),
				title: what.both(
					[
						"border-b-2",
					],
					[
						"round.default",
						"tone.neutral.light.border",
					],
				),
				items: what.css([
					"flex",
					"flex-col",
					"gap-2",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type SectionCls = typeof SectionCls;

export namespace SectionCls {
	export type Props<P = unknown> = Cls.Props<SectionCls, P>;
}
