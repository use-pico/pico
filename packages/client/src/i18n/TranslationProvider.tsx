"use client";

import type {
    TranslationsSchema,
    WithLocaleSchema
}                         from "@use-pico2/common";
import {
    type FC,
    type PropsWithChildren
}                         from "react";
import type {IWithQuery}  from "../query/IWithQuery";
import {QueryResult}      from "../query/QueryResult";
import {useQueryEx}       from "../query/useQueryEx";
import {withTranslations} from "./withTranslations";

export namespace TranslationProvider {
    export type Props = PropsWithChildren<{
        locale: string;
        withTranslationQuery: WithQuery;
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
        withQuery: withTranslationQuery,
        request:   {
            locale,
        },
    });

    return <QueryResult<TranslationsSchema>
        result={result}
        WithSuccess={({entity}) => {
            withTranslations(entity);
            return children;
        }}
        WithError={() => children}
    />;
};
