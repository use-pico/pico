import {
    type IHrefProps,
    linkTo
}                        from "@pico/navigation";
import {isString}        from "@pico/utils";
import CoolLink          from "next/link";
import {
    type ComponentProps,
    type FC
}                        from "react";
import {useLocaleRouter} from "../hook/useLocaleRouter";

export namespace LocaleLink {
    export interface Props extends Omit<ComponentProps<typeof CoolLink>, "href"> {
        href: IHrefProps | string;
        withLocale?: boolean;
    }
}

export const LocaleLink: FC<LocaleLink.Props> = (
    {
        href,
        withLocale = true,
        ...props
    }) => {
    const {locale} = useLocaleRouter();
    const $locale = withLocale ? locale : undefined;

    return <CoolLink
        href={linkTo(isString(href) ? {
            href: $locale ? `/${$locale}${href}` : href,
        } : {
            href:  $locale ? `/${$locale}${href.href}` : href.href,
            query: href.query,
        })}
        {...props}
    />;
};
