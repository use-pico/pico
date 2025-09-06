import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AbstractListCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"body",
			"items",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([]),
				body: what.css([]),
				items: what.css([]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type AbstractListCls = typeof AbstractListCls;

export namespace AbstractListCls {
	export type Props<P = unknown> = Cls.Props<AbstractListCls, P>;

	export type Slots = Cls.SlotsOf<AbstractListCls>;
}
