import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DetailCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"Detail-root",
						"flex",
						"flex-row",
						"flex-wrap",
					],
					[
						"border.default",
						"shadow.default",
						"round.default",
						"square.md",
						"tone.neutral.light.border",
						"tone.neutral.light.shadow",
					],
				),
			}),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type DetailCls = typeof DetailCls;

export namespace DetailCls {
	export type Props<P = unknown> = Cls.Props<DetailCls, P>;

	export type Slots = Cls.SlotsOf<DetailCls>;
}
