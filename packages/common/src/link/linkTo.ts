import buildUrl          from "build-url-ts";
import {
    compile,
    match
}                        from "path-to-regexp";
import type {IHrefProps} from "../href/IHrefProps";
import {diffOf}          from "../toolbox/diffOf";
import {isEmpty}         from "../toolbox/isEmpty";
import {isString}        from "../toolbox/isString";

/**
 * Generates a link and replaces "templates" with a proper values from the query object.
 *
 * @group toolbox
 *
 * @example
 * /foo/[id]/bar => /foo/123/bar
 */
export const linkTo = (
    props: IHrefProps | string
) => {
    if (isString(props)) {
        return props;
    }
    const {
        query,
        href
    } = props;
    const $query = query || {};
    const link = href.replace(/\[(?<id>.*?)\]/gu, ":$1").replace(/\{(?<id>.*?)\}/gu, ":$1");
    const compiled = compile(link)($query);
    const matched = match(link)(compiled);
    const queryParams = diffOf(
        Object.keys($query),
        Object.keys(matched ? matched.params : {}),
    ).reduce((prev, current) => {
        return {
            ...prev,
            [current]: (query as any)[current],
        };
    }, {});

    return buildUrl({
        path:        compiled,
        queryParams: isEmpty(queryParams) ? undefined : queryParams,
    }) as string;
};
