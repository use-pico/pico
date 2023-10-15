import {DateTime}          from "luxon";
import {type IDateRange}   from "../api/IDateRange";
import {type IRangeOfList} from "../api/IRangeOfList";

export const RangeOfList: IRangeOfList[] = [
    "none",
    "last-week",
    "current-week",
    "last-month",
    "current-month",
    "last-year",
    "current-year",
];

export namespace rangeOf {
    export interface Props {
        range?: string;
    }
}

export const rangeOf = (
    {
        range,
    }: rangeOf.Props
): IDateRange | undefined => {
    const now = DateTime.now();
    switch (range) {
        case "last-week": {
            const date = now.startOf("week");
            const from = date.minus({week: 1});
            return {
                from,
                to: from.endOf("week"),
            };
        }
        case "last-month": {
            const date = now.startOf("month");
            const from = date.minus({month: 1});
            return {
                from,
                to: from.endOf("month"),
            };
        }
        case "last-year": {
            const date = now.startOf("year");
            const from = date.minus({year: 1});
            return {
                from,
                to: from.endOf("year"),
            };
        }
        case "current-week": {
            const date = now.startOf("week");
            return {
                from: date,
                to:   date.endOf("week"),
            };
        }
        case "current-month": {
            const date = now.startOf("month");
            return {
                from: date,
                to:   date.endOf("month"),
            };
        }
        case "current-year": {
            const date = now.startOf("year");
            return {
                from: date,
                to:   date.endOf("year"),
            };
        }
    }
};
