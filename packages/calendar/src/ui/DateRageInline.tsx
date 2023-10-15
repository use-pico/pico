import {
    DateInline,
    DateTime,
    type DateTimeFormatOptions
}                          from "@use-pico/i18n";
import {NativeBreadcrumbs} from "@use-pico/ui";
import {type FC}           from "react";

export namespace DateRageInline {
    export interface Props extends Omit<NativeBreadcrumbs.Props, "children"> {
        start: DateTime;
        end: DateTime;
        startOptions?: DateTimeFormatOptions;
        endOptions?: DateTimeFormatOptions;
    }
}

export const DateRageInline: FC<DateRageInline.Props> = (
    {
        start,
        end,
        startOptions = {
            day:   "numeric",
            month: "numeric"
        },
        endOptions,
        ...props
    }) => {
    return <NativeBreadcrumbs
        separator={"→"}
        className={"secondary"}
        {...props}
    >
        <DateInline
            date={start}
            options={startOptions}
        />
        <DateInline
            date={end}
            options={endOptions}
        />
    </NativeBreadcrumbs>;
};
