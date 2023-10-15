import {
    type DateTime,
    type Interval
} from "@use-pico/i18n";

export interface IMonth {
    /**
     * ID of a month; unique within years, can be used as a React key
     */
    id: string;
    /**
     * Localized month name
     */
    name: string;
    /**
     * Beginning of the month
     */
    month: DateTime;
    /**
     * Month number
     */
    number: number;
    /**
     * Is this month current?
     */
    isCurrent: boolean;
}

export interface IMonths {
    /**
     * Current date of the generated (months) calendar
     */
    date: DateTime;
    selected?: DateTime;
    /**
     * Start date of the generated calendar
     */
    start: DateTime;
    /**
     * Final date of the generated calendar
     */
    end: DateTime;
    /**
     * Interval based on start/end for querying dates.
     */
    interval: Interval;
    /**
     * Is the "now" in a current calendar interval?
     */
    isCurrent: boolean;
    /**
     * Just for convenience - actual timestamp
     */
    now: DateTime;
    months: IMonth[];
    /**
     * Localized list of months
     */
    list: string[];
}
