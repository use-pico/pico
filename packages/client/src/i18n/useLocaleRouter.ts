"use client";

import {type IHrefProps, linkTo} from "@use-pico/common";
import {useParams, useRouter} from "next/navigation";

/**
 * Router with locale; expects "locale" parameter in Next.js `useParams` hook.
 */
export const useLocaleRouter = () => {
	const router = useRouter();
	const {locale} = useParams() as unknown as {
		locale: string
	};
	/**
	 * Mimic original next.js router, override push
	 */
	return {
		locale,
		...router,
		push: (
			{
				href,
				query
			}: IHrefProps
		) => {
			return router.push(linkTo({
				href: `/${locale ?? ""}${href}`.replace(/\/\//g, "/"),
				query,
			}));
		},
	} as const;
};
