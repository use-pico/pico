import {
    Weeks,
    WeeksOfProvider
}                from "@leight/calendar-client";
import {type FC} from "react";

export interface IDefaultWeeksProps {
}

export const DefaultWeeks: FC<IDefaultWeeksProps> = () => {
    /**
     * Here you can use WeeksProvider or CalendarProvider.
     *
     * CalendarProvider provides all stuff needed for the whole Calendar (weeks/months/years/...).
     */
    return <WeeksOfProvider>
        <Weeks
            /**
             * Controls are enabled by default and do not create such overhead; this is just for
             * an example to render must minimal calendar.
             */
            withControls={false}
        />
    </WeeksOfProvider>;
};
