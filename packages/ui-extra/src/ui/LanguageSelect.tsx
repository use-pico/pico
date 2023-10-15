import {
    useLocale,
    useTranslation
}                from "@use-pico/i18n";
import {
    usePathname,
    useWithRedirect
}                from "@use-pico/navigation";
import {Select}  from "@use-pico/ui";
import {type FC} from "react";

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
