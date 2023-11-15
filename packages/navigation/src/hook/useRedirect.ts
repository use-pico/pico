"use client";

import {useRouter}       from "next/navigation";
import {useEffect}       from "react";
import {type IHrefProps} from "../api/IHrefProps";
import {linkTo}          from "../utils/linkTo";

/**
 * Pure redirect without locale
 */
export const useRedirect = (href: IHrefProps) => {
    const {push} = useRouter();
    useEffect(() => {
        push(linkTo(href));
    }, []);
};
