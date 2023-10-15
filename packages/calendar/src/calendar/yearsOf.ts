import {
    DateTime,
    Interval
}                    from "@pico/i18n";
import {type IYears} from "../api/years";

export interface IYearsOfProps {
    /**
     * Input date - years of the year will be generated
     */
    date?: DateTime;
    selected?: DateTime;
    columns?: number;
    rows?: number;
}

export const yearsOf = (
    {
        selected,
        date = selected ?? DateTime.now(),
        columns = 5,
        rows = 3,
    }: IYearsOfProps
): IYears => {
    const margin = ((columns - 1) / 2) + (((rows - 1) / 2) * columns);
    const start = date.minus({year: margin});
    const end = date.plus({year: margin});
    const interval = Interval.fromDateTimes(start, end);
    const length = columns * rows;
    const now = DateTime.now();

    return {
        date,
        selected,
        start,
        end,
        interval,
        columns,
        rows,
        count: columns * rows,
        now,
        get isCurrent() {
            return now.year >= start.year && now.year <= end.year;
        },
        get list() {
            return Array.from({length}, (_, year) => start.year + year);
        },
        get years() {
            return Array.from({length}, (_, year) => {
                const $year = start.plus({year});
                const id = `${$year.year}`;
                return {
                    id,
                    name:       $year.year,
                    year:       $year,
                    isCurrent:  now.year === $year.year,
                    isSelected: selected ? selected.year === $year.year : false,
                };
            });
        },
    };
};
