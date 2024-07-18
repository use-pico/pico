import { useStore$ } from "../../store/useStore$";
import { ModalStore } from "./ModelStore";

/**
 * Returns a function to close the modal.
 */
export const useModalClose$ = () => {
	return (
		useStore$(ModalStore, ({ close }) => ({ close }))?.close ??
		(() => {
			//
		})
	);
};
