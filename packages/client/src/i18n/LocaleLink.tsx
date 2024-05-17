"use client";

import {
    cn,
    type IHrefProps,
    isString,
    linkTo
}                        from "@use-pico2/common";
import CoolLink          from "next/link";
import type {
    ComponentProps,
    FC
}                        from "react";
import {useLocaleRouter} from "./useLocaleRouter";

export namespace LocaleLink {
    export interface Props extends Omit<ComponentProps<typeof CoolLink>, "href">, cn.WithClass {
        href: IHrefProps | string;
        withLocale?: boolean;
    }
}

export const LocaleLink: FC<LocaleLink.Props> = (
    {
        href,
        withLocale = true,
        cx,
        ...props
    }) => {
    const {locale} = useLocaleRouter();
    const $locale = withLocale ? locale : undefined;

    return <CoolLink
        className={cn(
            cx,
        )}
        href={linkTo(isString(href) ? {
            href: $locale ? `/${$locale}${href}` : href,
        } : {
            href:  $locale ? `/${$locale}${href.href}` : href.href,
            query: href.query,
        })}
        {...props}
    />;
};
