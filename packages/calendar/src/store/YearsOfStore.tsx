import {DateTime}    from "@pico/i18n";
import {
    createStore,
    type IStoreProps
}                    from "@pico/store";
import {type IYears} from "../api/years";
import {yearsOf}     from "../calendar/yearsOf";

export namespace YearsOfStore {
    export type StoreProps = IStoreProps<{
        /**
         * Set years of the given date
         */
        yearsOf(date: DateTime): IYears;
        /**
         * Move to the current year
         */
        today(): IYears;
        /**
         * Move to the previous year (floating years)
         */
        prevYear(): IYears;
        /**
         * Move to the next year (floating years)
         */
        nextYear(): IYears;
        /**
         * Move to the previous "page" of years
         */
        prevYears(): IYears;
        /**
         * Move to the next "page" of years
         */
        nextYears(): IYears;
    }, {
        /**
         * Calendar is computed based on an input, so it cannot be required
         * in the time of store creation.
         */
        readonly years: IYears;
    }>
}

export const YearsOfStore = createStore<YearsOfStore.StoreProps>({
    state: ({state}) => (set, get) => ({
        yearsOf(date: DateTime) {
            set({
                years: yearsOf({date}),
            });
            return get().years;
        },
        today() {
            set(({years: {selected}}) => ({
                years: yearsOf({
                    date: DateTime.now(),
                    selected
                }),
            }));
            return get().years;
        },
        prevYear() {
            set(({
                     years: {
                                date,
                                selected
                            }
                 }) => ({
                years: yearsOf({
                    date: date.minus({year: 1}),
                    selected,
                }),
            }));
            return get().years;
        },
        nextYear() {
            set(({
                     years: {
                                date,
                                selected
                            }
                 }) => ({
                years: yearsOf({
                    date: date.plus({year: 1}),
                    selected,
                }),
            }));
            return get().years;
        },
        prevYears() {
            set(({
                     years: {
                                count,
                                date,
                                selected
                            }
                 }) => ({
                years: yearsOf({
                    date: date.minus({year: count}),
                    selected,
                }),
            }));
            return get().years;
        },
        nextYears() {
            set(({
                     years: {
                                count,
                                date,
                                selected
                            }
                 }) => ({
                years: yearsOf({
                    date: date.plus({year: count}),
                    selected,
                }),
            }));
            return get().years;
        },
        ...state,
    }),
    name:  "YearsOfStore",
    hint:  "Add YearsOfProvider or CalendarProvider.",
});
