"use client";

import {QueryResult}                from "@use-pico/query";
import {NextIntlClientProvider}     from "next-intl";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren
}                                   from "react";
import {type IWithTranslationQuery} from "../api/IWithTranslationQuery";
import {type TranslationSchema}     from "../schema/TranslationSchema";

export namespace TranslationProvider {
    export type Props = PropsWithChildren<{
        locale: string;
        withTranslationQuery: IWithTranslationQuery;
        intlProps?: Omit<ComponentProps<typeof NextIntlClientProvider>, "children" | "locale" | "messages">;
        loading?: QueryResult.Props<TranslationSchema>["WithLoading"];
    }>
}

export const TranslationProvider: FC<TranslationProvider.Props> = (
    {
        locale,
        withTranslationQuery,
        intlProps,
        children,
    }
) => {
    const result = withTranslationQuery.useQueryEx({
        request: {
            locale,
        }
    });
    const $intlProps: ComponentProps<typeof NextIntlClientProvider> = {
        locale,
        onError() {
        },
        getMessageFallback: process.env.NODE_ENV === "development" ? undefined : ({key}) => {
            return key;
        },
        children,
        ...intlProps,
    } as const;

    return <QueryResult
        result={result}
        WithSuccess={({data}) => {
            return <NextIntlClientProvider
                messages={data.translations}
                {...$intlProps}
            />;
        }}
        WithError={() => {
            return <NextIntlClientProvider
                messages={{}}
                {...$intlProps}
            />;
        }}
    />;
};
