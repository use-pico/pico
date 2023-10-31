import {withQuery as withCoolQuery} from "@use-pico/query";
import {TranslationSchema}          from "../schema/TranslationSchema";
import {WithLocaleSchema}           from "../schema/WithLocaleSchema";

export namespace withQuery {
    export type Props = Omit<withCoolQuery.Props<WithLocaleSchema, TranslationSchema>, "schema" | "key">;
}

export const withQuery = (props: withQuery.Props) => {
    return withCoolQuery({
        schema: {
            request:  WithLocaleSchema,
            response: TranslationSchema,
        },
        key:    ["translation"],
        ...props,
    });
};
