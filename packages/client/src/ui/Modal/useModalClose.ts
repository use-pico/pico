"use client";

import {useStore}   from "../../store/useStore";
import {ModalStore} from "./ModelStore";

/**
 * Returns a function to close the modal.
 */
export const useModalClose = () => {
	const {close} = useStore(ModalStore, ({close}) => ({close}));
	return close;
};
