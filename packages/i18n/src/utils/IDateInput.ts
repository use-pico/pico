import {type DateTime} from "luxon";

/**
 * Which types are accepted as input type for formatting functions.
 */
export type IDateInput =
    string
    | Date
    | DateTime;
