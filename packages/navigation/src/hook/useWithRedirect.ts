"use client";

import {useRouter}      from "next/navigation";
import {type INavigate} from "../api/INavigate";
import {linkTo}         from "../utils/linkTo";

/**
 * Pure redirect without locale
 */
export const useWithRedirect = (): INavigate => {
    const {push} = useRouter();
    return href => {
        href && push(linkTo(href));
    };
};
