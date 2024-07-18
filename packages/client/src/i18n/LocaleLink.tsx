import {
	Css,
	cssOf,
	isString,
	linkTo,
	type IHrefProps,
} from "@use-pico/common";
import type { AnchorHTMLAttributes, FC } from "react";
import { useLocaleRouter } from "./useLocaleRouter";

/**
 * Locale link is a low-level component based on Next.js Link component.
 *
 * It takes currently resolved locale and uses it to create a link.
 *
 * @group ui
 */
export namespace LocaleLink {
	/**
	 * Props for `LocaleLink` component.
	 */
	export interface Props
		extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
			Css.Style {
		/**
		 * Link to generate.
		 */
		href: IHrefProps | string;
		/**
		 * True - use current locale, false - without a locale.
		 */
		withLocale?: boolean;
		/**
		 * Disabled renders only children without a link.
		 */
		disabled?: boolean;
	}
}

export const LocaleLink: FC<LocaleLink.Props> = ({
	href,
	withLocale = true,
	css,
	disabled = false,
	...props
}) => {
	const { locale } = useLocaleRouter();
	const $locale = withLocale ? locale : undefined;

	return disabled ?
			<span className={cssOf("cursor-not-allowed", css)}>{props.children}</span>
		:	<a
				className={cssOf(css)}
				href={linkTo(
					isString(href) ?
						{
							href: $locale ? `/${$locale}${href}` : href,
						}
					:	{
							href: $locale ? `/${$locale}${href.href}` : href.href,
							query: href.query,
						},
				)}
				{...props}
			/>;
};
