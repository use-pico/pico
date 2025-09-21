import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import { VariantProvider } from "./VariantProvider";

export namespace wrap {
	export interface Props<TContract extends Contract.Any> {
		cls: Cls.Type<TContract>;
	}
}

/**
 * React wrapper - useful for preparing type-safe variants for React components.
 */
export const wrap = <TContract extends Contract.Any>(
	cls: Cls.Type<TContract>,
) => {
	return {
		VariantProvider(props: Omit<VariantProvider.Props<TContract>, "cls">) {
			return (
				<VariantProvider
					cls={cls}
					{...props}
				/>
			);
		},
	} as const;
};
