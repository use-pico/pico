import {
    Select,
    useWithRedirect
}                       from "@pico/ui";
import {useLocale}      from "next-intl";
import {usePathname}    from "next/navigation";
import {type FC}        from "react";
import {useTranslation} from "../hook/useTranslation";

export namespace LanguageSelect {
    export interface Props extends Omit<Select.Props, "data"> {
        languages: string[];
    }
}

export const LanguageSelect: FC<LanguageSelect.Props> = (
    {
        languages,
        ...props
    }) => {
    const currentLocale = useLocale();
    const redirect = useWithRedirect();
    const pathname = usePathname();
    const translation = useTranslation({
        namespace: "common",
        label:     "language"
    });
    return <Select
        data={languages.map(language => ({
            label: translation(language),
            value: language,
        }))}
        defaultValue={currentLocale}
        onChange={language => language && pathname && redirect(pathname.replace(`/${currentLocale}/`, `/${language}/`))}
        {...props}
    />;
};
