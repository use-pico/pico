import { buildUrl } from "build-url-ts";
import { compile, match } from "path-to-regexp";
import { diffOf } from "../toolbox/diffOf";
import { isEmpty } from "../toolbox/isEmpty";

export namespace linkTo {
	export interface Props {
		/**
		 * @example
		 * 		linkTo({
		 * 			base: import.meta.env.BASE_URL,
		 * 			href: "/foo/[id]/bar",
		 * 			query: { id: 123 },
		 * 		})
		 */
		base?: string;
		query?: Record<string, any>;
		href: string;
	}
}

/**
 * Generates a link and replaces "templates" with a proper values from the query object.
 *
 * @group toolbox
 *
 * @example
 * /foo/[id]/bar => /foo/123/bar
 */
export const linkTo = ({ base = "", query = {}, href }: linkTo.Props) => {
	const link = href
		.replace(/\[(?<id>.*?)\]/gu, ":$1")
		.replace(/\{(?<id>.*?)\}/gu, ":$1");
	const compiled = compile(link)(query);
	const matched = match(link)(compiled);
	const queryParams = diffOf(
		Object.keys(query),
		Object.keys(matched ? matched.params : {}),
	).reduce(
		(prev, current) => {
			prev[current] = query[current];
			return prev;
		},
		{} as Record<string, any>,
	);

	return buildUrl(base, {
		path: `${compiled}`.replace(/\/+/gu, "/"),
		queryParams: isEmpty(queryParams) ? undefined : queryParams,
	}) as string;
};
