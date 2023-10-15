import {
    buildUrl,
    diffOf,
    isEmpty,
    isString,
    pathToRegexp
}                        from "@use-pico/utils";
import {type IHrefProps} from "../api/IHrefProps";

export const linkTo = <
    TPath extends string,
>(
    props: IHrefProps<TPath> | TPath
) => {
    if (isString(props)) {
        return props;
    }
    const {
        query,
        href
    } = props;
    const $query = query || {};
    const link = href.replace(/\[(.*?)\]/g, ":$1").replace(/{(.*?)}/g, ":$1");
    const compiled = pathToRegexp.compile(link)($query);
    const matched = pathToRegexp.match(link)(compiled);
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
    });
};
