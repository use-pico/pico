"use client";

import {
    DetectLocale,
    localeOf
}                 from "@use-pico/i18n";
import {redirect} from "next/navigation";
import {type FC}  from "react";

export namespace LocaleRedirect {
    export interface Props {
        target?: string;
        locale: localeOf.Props;
        detectLocaleProps?: Omit<DetectLocale.Props, "locale" | "callback">;
    }
}

export const LocaleRedirect: FC<LocaleRedirect.Props> = (
    {
        target,
        locale,
        detectLocaleProps,
    }) => {
    return <DetectLocale
        locale={locale}
        callback={({locale}) => redirect(target ? `/${locale}/${target}` : `/${locale}`)}
        {...detectLocaleProps}
    />;
};
