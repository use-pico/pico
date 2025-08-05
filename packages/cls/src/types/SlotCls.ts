import type { ClassName } from "./ClassName";
import type { SlotEx } from "./ex/SlotEx";
import type { ClsFn } from "./fn/ClsFn";
import type { SlotProps } from "./props/SlotProps";

/**
 * Maps slot names to optional class name values.
 * TSlot represents the slot definition with slot names as keys.
 * TUse represents an extension that may provide additional slots.
 * This type is used when providing class name overrides for specific slots.
 */
export type SlotCls<
	TSlot extends SlotProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> = {
	[K in keyof SlotEx<TSlot, TUse>]?: ClassName;
};
