import type { PropsWithChildren } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { merge } from "../utils/merge";
import { TweakContext } from "./TweakContext";
import { useTweakContext } from "./useTweakContext";

export namespace TweakProvider {
	export interface Props<TContract extends Contract.Any>
		extends PropsWithChildren {
		cls: Cls.Type<TContract>;
		tweak: Tweak.Type<TContract>;
		inherit?: boolean;
	}
}

export const TweakProvider = <TContract extends Contract.Any>({
	/**
	 * Used only to infer types
	 */
	cls: _,
	tweak,
	inherit = false,
	children,
}: TweakProvider.Props<TContract>) => {
	const parent = useTweakContext();

	return (
		<TweakContext value={inherit ? merge(tweak, parent) : tweak}>
			{children}
		</TweakContext>
	);
};
