import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LabelCountCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"label",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"LabelCount-root",
					"flex",
					"flex-row",
					"items-center",
					"w-fit",
					"gap-2",
				]),
				label: what.css([
					"LabelCount-label",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type LabelCountCls = typeof LabelCountCls;

export namespace LabelCountCls {
	export type Props<P = unknown> = Cls.Props<LabelCountCls, P>;
}
