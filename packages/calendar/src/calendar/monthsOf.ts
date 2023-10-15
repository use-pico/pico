import {
    DateTime,
    Info,
    Interval,
    type StringUnitLength
}                     from "@pico/i18n";
import {type IMonths} from "../api/months";

export interface IMonthsOfProps {
    /**
     * Input date - months of the year will be generated
     */
    date?: DateTime;
    selected?: DateTime;
    monthFormat?: StringUnitLength;
}

export const monthsOf = (
    {
        selected,
        date = selected ?? DateTime.now(),
        monthFormat = "long",
    }: IMonthsOfProps
): IMonths => {
    const start = date.startOf("year");
    const end = date.endOf("year");
    const interval = Interval.fromDateTimes(start, end);
    const length = interval.count("months");
    const now = DateTime.now();

    return {
        date,
        selected,
        start,
        end,
        interval,
        now,
        get isCurrent() {
            return interval.contains(now);
        },
        get list() {
            return Info.months(monthFormat);
        },
        get months() {
            return Array.from({length}, (_, month) => {
                const $month = start.plus({month});
                const id = `${$month.year}-${$month.month}`;
                return {
                    id,
                    name:      $month.toLocaleString({month: "long"}),
                    month:     $month,
                    number:    $month.month,
                    isCurrent: now.year === $month.year && now.month === $month.month,
                };
            });
        },
    };
};
