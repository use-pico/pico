import type { PropsWithChildren } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Variant } from "../types/Variant";
import { merge } from "../utils/merge";
import { useVariantContext } from "./useVariantContext";
import { VariantContext } from "./VariantContext";

export namespace VariantProvider {
	export interface Props<TContract extends Contract.Any>
		extends PropsWithChildren {
		cls: Cls.Type<TContract>;
		variant: Variant.Optional<TContract>;
		inherit?: boolean;
	}
}

export const VariantProvider = <TContract extends Contract.Any>({
	/**
	 * Used only to infer types
	 */
	cls: _,
	variant,
	inherit = false,
	children,
}: VariantProvider.Props<TContract>) => {
	const parent = useVariantContext();

	return (
		<VariantContext
			value={
				(inherit
					? merge(
							{
								variant,
							},
							{
								variant: parent,
							},
						)
					: {
							variant,
						}
				).variant ?? {}
			}
		>
			{children}
		</VariantContext>
	);
};
