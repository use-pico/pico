import type { PropsWithChildren } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import type { Variant } from "../types/Variant";
import { tweak } from "../utils/tweak";
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
	/**
	 * A little lie here, but in general it should be somehow OK.
	 */
	const parent = useVariantContext() as Tweak.Type<TContract>["variant"];

	return (
		<VariantContext
			value={
				tweak([
					{
						variant,
					},
					inherit
						? {
								variant: parent,
							}
						: undefined,
				]).variant ?? {}
			}
		>
			{children}
		</VariantContext>
	);
};
