import { cls } from "@use-pico/common";
import { PopupSelectCls } from "../popup-select/PopupSelectCls";

export const PopupMultiSelectCls = cls({
	use: PopupSelectCls,
	slot: {},
	variant: {},
	defaults: {},
});
export type PopupMultiSelectCls = typeof PopupMultiSelectCls;

export namespace PopupMultiSelectCls {
	export type Props<P = unknown> = cls.Props<PopupMultiSelectCls, P>;

	export type Slots = cls.Slots<PopupMultiSelectCls>;
}
