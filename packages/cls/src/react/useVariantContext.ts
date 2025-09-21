import { useContext } from "react";
import type { Contract } from "../types/Contract";
import type { Variant } from "../types/Variant";
import { VariantContext } from "./VariantContext";

export const useVariantContext = (): Variant.Optional<Contract.Any> => {
	return useContext(VariantContext) ?? {};
};
