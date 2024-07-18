/**
 * This interface is used for link generator; it holds template string and query parameters.
 *
 * @group api
 */
export interface IHrefProps {
	/**
	 * Template string for the link.
	 */
	href: string;
	/**
	 * Query parameters for the link.
	 *
	 * Parameters which are not present in the template are appended as a "classic" query string.
	 */
	query?: Record<string, string | number>;
}
