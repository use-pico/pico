import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabListCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"tabs",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"TabList-root",
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
				]),
				tabs: what.css([
					"TabList-tabs",
					"flex",
					"flex-row",
					"items-center",
					"gap-1",
					"mb-4",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type TabListCls = typeof TabListCls;

export namespace TabListCls {
	export type Props<P = unknown> = Cls.Props<TabListCls, P>;
}
