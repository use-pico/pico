import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TransferCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"panel",
			"group",
			"header",
			"item",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"grid",
					"grid-cols-2",
					"gap-2",
					"select-none",
				]),
				panel: what.both(
					[
						"grow",
						"rounded",
						"p-4",
					],
					[
						"border.default",
						"tone.neutral.light.border",
					],
				),
				group: what.css([
					"transition-none",
				]),
				header: what.css([
					"font-bold",
				]),
				item: what.both(
					[
						"flex",
						"flex-row",
						"items-center",
						"justify-between",
						"p-2",
						"rounded",
						"border-b",
						"border-transparent",
						"cursor-pointer",
						"group",
					],
					[
						"tone.neutral.light.border:hover",
						"tone.neutral.light.bg:hover",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type TransferCls = typeof TransferCls;

export namespace TransferCls {
	export type Props<P = unknown> = Cls.Props<TransferCls, P>;
}
