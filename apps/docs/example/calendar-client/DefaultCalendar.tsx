import {
    Calendar,
    CalendarProvider,
    type ICalendarProps
}                from "@leight/calendar-client";
import {type FC} from "react";

export interface IDefaultCalendarProps extends ICalendarProps {
}

export const DefaultCalendar: FC<IDefaultCalendarProps> = (props) => {
    return <CalendarProvider>
        <Calendar
            withControls={false}
            {...props}
        />
    </CalendarProvider>;
};
