"use client";

import {type INavigate} from "@pico/types";
import {linkTo}         from "@pico/utils";
import {useRouter}      from "next/navigation";

/**
 * Pure redirect without locale
 */
export const useWithRedirect = (): INavigate => {
    const {push} = useRouter();
    return href => {
        href && push(linkTo(href));
    };
};
