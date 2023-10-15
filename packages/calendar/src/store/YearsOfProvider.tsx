import {type DateTime} from "@use-pico/i18n";
import {
    type FC,
    type PropsWithChildren
}                      from "react";
import {yearsOf}       from "../calendar/yearsOf";
import {YearsOfStore}  from "./YearsOfStore";

export namespace YearsOfProvider {
    export type Props = PropsWithChildren<{
        date?: DateTime;
        selected?: DateTime;
    }>;
}

export const YearsOfProvider: FC<YearsOfProvider.Props> = (
    {
        date,
        selected,
        ...props
    }) => {
    return <YearsOfStore.Provider
        state={{
            years: yearsOf({
                date,
                selected,
            }),
        }}
        {...props}
    />;
};
