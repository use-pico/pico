"use client";

import {
    QueryResult,
    useQueryEx
}                                   from "@use-pico/query";
import {flatten}                    from "flat";
import {
    type FC,
    type PropsWithChildren
}                                   from "react";
import {IntlProvider}               from "react-intl";
import {type IWithTranslationQuery} from "../api/IWithTranslationQuery";
import {type TranslationSchema}     from "../schema/TranslationSchema";

export namespace TranslationProvider {
    export type Props = PropsWithChildren<{
        locale: string;
        withTranslationQuery: IWithTranslationQuery;
        loading?: QueryResult.Props<TranslationSchema>["WithLoading"];
    }>
}

export const TranslationProvider: FC<TranslationProvider.Props> = (
    {
        locale,
        withTranslationQuery,
        ...props
    }
) => {
    const result = useQueryEx({
        withQuery: withTranslationQuery,
        request:   {
            locale,
        },
    });

    return <QueryResult
        result={result}
        WithResponse={({entity}) => <IntlProvider
            messages={flatten(entity.translations)}
            locale={locale}
            defaultLocale={"en"}
            {...props}
        />}
        WithError={() => <IntlProvider
            messages={{}}
            locale={locale}
            defaultLocale={"en"}
            {...props}
        />}
    />;
};
