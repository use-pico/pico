import {type IWithLinkTo} from "@pico/types";
import {
    isString,
    linkTo
}                         from "@pico/utils";
import {useLocaleRouter}  from "./useLocaleRouter";

export const useLocaleLinkTo = (): IWithLinkTo => {
    const {locale} = useLocaleRouter();
    return href => linkTo(isString(href) ? {
        href,
    } : {
        href:  `/${locale ?? ""}${href.href}`,
        query: href.query,
    });
};
