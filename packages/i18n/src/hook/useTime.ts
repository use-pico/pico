import {toHumanTimeMs} from "@use-pico/utils";
import {useLocale}     from "./useLocale";

export const useTime = () => {
    const locale = useLocale();
    return (milliseconds: number) => {
        return toHumanTimeMs(milliseconds, {
            language: locale,
        });
    };
};
