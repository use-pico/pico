import {DateTime}    from "@use-pico/i18n";
import {
    createStore,
    type IStore
}                    from "@use-pico/store";
import {generateId}  from "@use-pico/utils";
import {type IWeeks} from "../api/weeks";
import {weeksOf}     from "../calendar/weeksOf";

export namespace WeeksOfStore {
    export type StoreProps = IStore<{
        id: string;
        /**
         * Set weeks of the given date
         */
        weeksOf(date: DateTime): IWeeks;
        /**
         * Move to the current month
         */
        today(): IWeeks;
        /**
         * Change weeks to the previous month
         */
        prevMonth(): IWeeks;
        /**
         * Change weeks to the next month
         */
        nextMonth(): IWeeks;
        prevYear(): IWeeks;
        nextYear(): IWeeks;
    }, {
        /**
         * Calendar is computed based on an input, so it cannot be required
         * in the time of store creation.
         */
        readonly weeks: IWeeks;
    }>
}

export const WeeksOfStore = createStore<WeeksOfStore.StoreProps>(values => (set, get) => ({
    id: generateId(),
    weeksOf(date: DateTime) {
        set(({weeks: {selected}}) => ({
            id:    generateId(),
            weeks: weeksOf({
                date,
                selected,
            }),
        }));
        return get().weeks;
    },
    today() {
        set(({weeks: {selected}}) => ({
            id:    generateId(),
            weeks: weeksOf({
                date: DateTime.now(),
                selected,
            }),
        }));
        return get().weeks;
    },
    prevMonth() {
        set(({
                 weeks: {
                            date,
                            selected
                        }
             }) => ({
            id:    generateId(),
            weeks: weeksOf({
                date: date.minus({month: 1}),
                selected,
            }),
        }));
        return get().weeks;
    },
    nextMonth() {
        set(({
                 weeks: {
                            date,
                            selected
                        }
             }) => ({
            id:    generateId(),
            weeks: weeksOf({
                date: date.plus({month: 1}),
                selected,
            }),
        }));
        return get().weeks;
    },
    prevYear() {
        set(({
                 weeks: {
                            date,
                            selected
                        }
             }) => ({
            id:    generateId(),
            weeks: weeksOf({
                date: date.minus({year: 1}),
                selected,
            }),
        }));
        return get().weeks;
    },
    nextYear() {
        set(({
                 weeks: {
                            date,
                            selected
                        }
             }) => ({
            id:    generateId(),
            weeks: weeksOf({
                date: date.plus({year: 1}),
                selected,
            }),
        }));
        return get().weeks;
    },
    ...values,
}));
