import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PageCls = PicoCls.extend(
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
				root: what.css([
					"Page-root",
					"flex",
					"flex-col",
					"gap-2",
				]),
			}),
		],
		defaults: def.defaults({
			tone: "unset",
			theme: "unset",
		}),
	}),
);

export type PageCls = typeof PageCls;

export namespace PageCls {
	export type Props<P = unknown> = Cls.Props<typeof PageCls, P>;
}
