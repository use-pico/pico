import { useContext } from "react";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { TweakContext } from "./TweakContext";

export const useTweakContext = (): Tweak.Type<Contract.Any> => {
	return useContext(TweakContext);
};
