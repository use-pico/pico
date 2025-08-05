import type { ClsFn, Internal } from "@use-pico/cls";
import { useStableMemo } from "./useStableMemo";

export const useCls = <
	TSlot extends Internal._SlotProps<any>,
	TVariant extends Internal._VariantProps<any>,
	TUse extends Internal._ValuesProps<any> | unknown = unknown,
>(
	fn: ClsFn<TSlot, TVariant, TUse>,
	variant?: Internal._ValuesProps<Internal._VariantEx<TVariant, TUse>>,
	cls?: Internal._SlotCls<TSlot, TUse>,
) => {
	return useStableMemo(() => {
		return fn(variant, cls);
	}, [
		variant,
		cls,
	]);
};
