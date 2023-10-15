import {toHumanTimeMs} from "@pico/utils";
import {useLocale}     from "next-intl";

export const useTime = () => {
    const locale = useLocale();
    return (milliseconds: number) => {
        return toHumanTimeMs(milliseconds, {
            language: locale,
        });
    };
};
