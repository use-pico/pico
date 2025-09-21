import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import { TweakProvider } from "./TweakProvider";

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
		TweakProvider(props: Omit<TweakProvider.Props<TContract>, "cls">) {
			return (
				<TweakProvider
					cls={cls}
					{...props}
				/>
			);
		},
	} as const;
};
