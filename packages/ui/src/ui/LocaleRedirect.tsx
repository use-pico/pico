"use client";

import {LoadingOverlay} from "@mantine/core";
import {
    DetectLocale,
    localeOf
}                       from "@pico/i18n";
import {redirect}       from "next/navigation";
import {type FC}        from "react";

export namespace LocaleRedirect {
    export interface Props {
        locale: localeOf.Props;
    }
}

export const LocaleRedirect: FC<LocaleRedirect.Props> = (
    {
        locale,
    }) => {
    return <>
        <DetectLocale
            locale={locale}
            callback={({locale}) => redirect(`/${locale}`)}
        />
        <LoadingOverlay visible={true}/>
    </>;
};
