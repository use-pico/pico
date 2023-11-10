"use client";

import {
    type IWithQuery,
    QueryResult,
    useQueryEx,
    withDummyQuery
}                                from "@use-pico/query";
import {
    type FC,
    type PropsWithChildren
}                                from "react";
import {type TranslationsSchema} from "../schema/TranslationsSchema";
import {type WithLocaleSchema}   from "../schema/WithLocaleSchema";
import {withTranslations}        from "../translator/withTranslations";

export namespace TranslationProvider {
    export type Props = PropsWithChildren<{
        locale: string;
        withTranslationQuery?: WithQuery;
        loading?: QueryResult.Props<TranslationsSchema>["WithLoading"];
    }>

    export type WithQuery = IWithQuery<WithLocaleSchema, TranslationsSchema>;
}

export const TranslationProvider: FC<TranslationProvider.Props> = (
    {
        locale,
        withTranslationQuery,
        children
    }
) => {
    const result = useQueryEx({
        withQuery: withTranslationQuery || withDummyQuery,
        request:   {
            locale,
        },
    });

    return <QueryResult
        result={result}
        WithSuccess={({entity}) => {
            withTranslations(entity);
            return children;
        }}
        WithError={() => children}
    />;
};
