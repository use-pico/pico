"use client";

import {
    createStore,
    type IStoreProps
}                        from "@use-pico/store";
import {
    DateTime,
    type DateTimeFormatOptions
}                        from "luxon";
import {type IDateInput} from "../utils/IDateInput";
import {iso2locale}      from "../utils/iso2locale";

export namespace DateTimeStore {
    /**
     * Store shape for date time context.
     */
    export type StoreProps = IStoreProps<{
        /**
         * Take input string in ISO format and reformat it into the user's locale.
         */
        toLocalDate(date?: IDateInput | null, fallback?: IDateInput, opts?: DateTimeFormatOptions): string | undefined;
        /**
         * Take input string in ISO format and return localized date & time
         */
        toLocalDateTime(date?: IDateInput | null, fallback?: IDateInput, opts?: DateTimeFormatOptions): string | undefined;
        toUtcDateTime(date?: IDateInput): string | undefined;
        toUtcDate(date?: IDateInput): string | undefined;
    }, {
        locale: string;
    }>
}

export const DateTimeStore = createStore<DateTimeStore.StoreProps>({
    state: ({state}) => () => ({
        toLocalDate(date, fallback, opts = DateTime.DATE_MED) {
            return iso2locale(date || undefined, fallback, opts);
        },
        toLocalDateTime(date, fallback, opts = DateTime.DATETIME_MED) {
            return iso2locale(date || undefined, fallback, opts);
        },
        toUtcDateTime() {
            console.error("Not supported yet!");
            return undefined;
        },
        toUtcDate() {
            console.error("Not supported yet!");
            return undefined;
        },
        ...state,
    }),
    name:  "DateTimeStore",
    hint:  "Add DateTimeProvider.",
});
