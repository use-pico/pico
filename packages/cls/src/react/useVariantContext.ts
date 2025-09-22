import { useContext } from "react";
import type { Contract } from "../types/Contract";
import type { Tweak } from "../types/Tweak";
import { VariantContext } from "./VariantContext";

export const useVariantContext = (): Tweak.Type<Contract.Any>["variant"] => {
	return useContext(VariantContext);
};
