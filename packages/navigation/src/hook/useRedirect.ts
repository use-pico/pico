"use client";

import {useEffect}       from "react";
import {useRouter}       from "../$export/useRouter";
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
