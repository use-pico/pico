"use client";

import {
    cn,
    type IHrefProps,
    isString,
    linkTo
}                        from "@use-pico/common";
import CoolLink          from "next/link";
import type {
    ComponentProps,
    FC
}                        from "react";
import {useLocaleRouter} from "./useLocaleRouter";

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
	export interface Props extends Omit<ComponentProps<typeof CoolLink>, "href">, cn.WithClass {
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

export const LocaleLink: FC<LocaleLink.Props> = (
	{
		href,
		withLocale = true,
		cx,
        disabled = false,
		...props
	}) => {
	const {locale} = useLocaleRouter();
	const $locale = withLocale ? locale : undefined;

    return disabled ? <span
        className={cn(
            "cursor-not-allowed",
            cx,
        )}
    >
		{props.children}
	</span> : <CoolLink
		className={cn(
			cx,
		)}
		href={linkTo(isString(href) ? {
			href: $locale ? `/${$locale}${href}` : href,
		} : {
            href: $locale ? `/${$locale}${href.href}` : href.href,
			query: href.query,
		})}
		{...props}
	/>;
};
