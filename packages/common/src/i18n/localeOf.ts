import {preferredLocale} from "preferred-locale";

export namespace localeOf {
    export interface Props {
        available: string[];
        fallback: string;
    }
}

/**
 * Extract preferred locale from the available locales and fallback locale.
 */
export const localeOf = (
    {
        available,
        fallback
    }: localeOf.Props
) => {
    return preferredLocale(fallback, available, {
        languageOnly: true,
    });
};
