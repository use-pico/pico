import {type IHrefProps} from "@pico/navigation";
import {isString}        from "@pico/utils";
import {useLocaleRouter} from "./useLocaleRouter";

export namespace useWithLocaleRedirect {
    export type Redirect = ReturnType<typeof useWithLocaleRedirect>;
}

export const useWithLocaleRedirect = () => {
    const {push} = useLocaleRouter();
    return (href?: IHrefProps | string | null) => href && push(isString(href) ? {
        href,
    } : {
        href:  href.href,
        query: href.query,
    });
};
