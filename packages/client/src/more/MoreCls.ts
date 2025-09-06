import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MoreCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"item",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"flex",
					"flex-row",
					"flex-wrap",
					"items-center",
					"gap-2",
					"text-sm",
					"font-semibold",
				]),
				item: what.both(
					[
						"px-2",
						"py-1",
					],
					[
						"border.default",
						"round.default",
						"tone.neutral.light.border",
						"tone.neutral.light.bg",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);
export type MoreCls = typeof MoreCls;

export namespace MoreCls {
	export type Props<P = unknown> = Cls.Props<MoreCls, P>;
}
