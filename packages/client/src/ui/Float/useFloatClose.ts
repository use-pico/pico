"use client";

import {useStore}   from "../../store/useStore";
import {FloatStore} from "./FloatStore";

/**
 * Returns a function to close the modal.
 */
export const useFloatClose = () => {
    const {close} = useStore(FloatStore, ({close}) => ({close}));
    return close;
};
