"use client";

import {
    type INavigate,
    linkTo
}                  from "@use-pico2/common";
import {useRouter} from "next/navigation";

/**
 * Pure redirect without locale
 */
export const useWithRedirect = (): INavigate => {
    const {push} = useRouter();
    return href => {
        href && push(linkTo(href));
    };
};
