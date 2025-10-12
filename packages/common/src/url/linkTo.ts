import urlcat, { type ParamMap } from "../urlcat/urlcat";

export namespace linkTo {
	export interface Props {
		/**
		 * @example
		 * 		linkTo({
		 * 			base: import.meta.env.BASE_URL,
		 * 			href: "/foo/:id/bar?foo=bar",
		 * 			query: { id: "123", foo: "bar" },
		 * 		})
		 */
		base?: string;
		href: string;
		query?: ParamMap;
	}
}

/**
 * Generates a link and replaces "templates" with a proper values from the query object.
 *
 * @group toolbox
 *
 * @example
 * /foo/:id/bar => /foo/123/bar
 */
export const linkTo = ({ base = "", query = {}, href }: linkTo.Props) => {
	return urlcat(base, href, query);
};
