"use client";

import {type IHrefProps} from "@pico/types";
import {linkTo}          from "@pico/utils";
import {useRouter}       from "next/navigation";
import {useEffect}       from "react";

/**
 * Pure redirect without locale
 */
export const useRedirect = (href: IHrefProps) => {
    const {push} = useRouter();
    useEffect(() => {
        push(linkTo(href));
    }, []);
};
