"use client";

import {
    type INavigate,
    linkTo
}                  from "@use-pico/common";
import {useRouter} from "next/navigation";

/**
 * Pure redirect without locale
 */
export const useWithRedirect = (): INavigate => {
    const {push} = useRouter();
    return href => {
        if (href) {
            push(linkTo(href));
        }
    };
};
