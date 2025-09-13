import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PopupSelectCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"input",
		],
		variant: {
			isLoading: [
				"bool",
			],
			selected: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				input: what.css([
					"PopupSelect-input",
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"cursor-pointer",
					"transition-all",
					"duration-100",
				]),
			}),
		],
		defaults: def.defaults({
			isLoading: false,
			selected: false,
		}),
	}),
);

export type PopupSelectCls = typeof PopupSelectCls;

export namespace PopupSelectCls {
	export type Props<P = unknown> = Cls.Props<PopupSelectCls, P>;

	export type Slots = Cls.SlotsOf<PopupSelectCls>;
}
