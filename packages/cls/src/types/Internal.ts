import type { VariantEx } from "./ex/VariantEx";
import type { ClsFn } from "./fn/ClsFn";
import type { SlotProps } from "./props/SlotProps";
import type { ValuesProps } from "./props/ValuesProps";
import type { VariantProps } from "./props/VariantProps";
import type { SlotCls } from "./SlotCls";

export namespace Internal {
	export type _SlotProps<TSlotKeys extends string> = SlotProps<TSlotKeys>;

	export type _SlotCls<
		TSlot extends SlotProps<any>,
		TUse extends ClsFn<any, any, any> | unknown = unknown,
	> = SlotCls<TSlot, TUse>;

	export type _ValuesProps<TVariant> = ValuesProps<TVariant>;

	export type _VariantProps<
		TSlotKeys extends string,
		TVariantKeys extends string,
	> = VariantProps<TSlotKeys, TVariantKeys>;

	export type _VariantEx<
		TSlotProps extends SlotProps<any>,
		TVariantProps extends VariantProps<keyof TSlotProps & string, any>,
		TUse extends
			| (() => {
					"~type": {
						variant?: VariantProps<any, any>;
					};
			  })
			| unknown = unknown,
	> = VariantEx<TSlotProps, TVariantProps, TUse>;
}
