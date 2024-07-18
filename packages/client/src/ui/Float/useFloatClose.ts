import { useStore } from "../../store/useStore";
import { FloatStore } from "./FloatStore";

/**
 * Returns a function to close the modal.
 */
export const useFloatClose = () => {
	return useStore(FloatStore, ({close}) => ({close})).close;
};
