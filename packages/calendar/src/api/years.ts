import {
    type DateTime,
    type Interval
} from "@pico/i18n";

export interface IYear {
    /**
     * ID of a year; unique within years, can be used as a React key
     */
    id: string;
    /**
     * Year number
     */
    name: number;
    /**
     * Beginning of the year
     */
    year: DateTime;
    /**
     * Is this year current?
     */
    isCurrent: boolean;
    isSelected: boolean;
}

export interface IYears {
    /**
     * Current date of the generated (years) calendar
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
    columns: number;
    rows: number;
    count: number;
    /**
     * Is the "now" in a current calendar interval?
     */
    isCurrent: boolean;
    /**
     * Just for convenience - actual timestamp
     */
    now: DateTime;
    /**
     * Simple list of years
     */
    list: number[];
    years: IYear[];
}
