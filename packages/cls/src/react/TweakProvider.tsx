import type { PropsWithChildren } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { TweakContext } from "./TweakContext";

export namespace TweakProvider {
	export interface Props<TContract extends Contract.Any>
		extends PropsWithChildren {
		cls: Cls.Type<TContract>;
		tweak: Tweak.Type<TContract>;
	}
}

export const TweakProvider = <TContract extends Contract.Any>({
	/**
	 * Used only to infer types
	 */
	cls: _,
	tweak,
	children,
}: TweakProvider.Props<TContract>) => {
	return <TweakContext value={tweak}>{children}</TweakContext>;
};
