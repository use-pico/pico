"use client";

import {
    type IHrefProps,
    linkTo,
    useParams,
    useRouter
} from "@pico/navigation";

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
        push: ({
                   href,
                   query
               }: IHrefProps) => {
            return router.push(linkTo({
                href: `/${locale ?? ""}${href}`,
                query,
            }));
        },
    } as const;
};
