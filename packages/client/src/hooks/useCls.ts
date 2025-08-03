import type { cls } from "@use-pico/common";
import { useStableMemo } from "./useStableMemo";

export const useCls = <
	TSlot extends cls.Internal.SlotDef<any>,
	TVariant extends cls.Internal.VariantDef<any>,
	TUse extends cls.Internal.ClsFn<any, any, any> | unknown = unknown,
>(
	fn: cls.Internal.ClsFn<TSlot, TVariant, TUse>,
	variant?: cls.Internal.ValuesDef<cls.Internal.VariantEx<TVariant, TUse>>,
	cls?: cls.Internal.SlotCls<TSlot, TUse>,
) => {
	return useStableMemo(() => {
		return fn(variant, cls);
	}, [
		variant,
		cls,
	]);
};
