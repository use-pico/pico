import {Shell}            from "@leight/mantine";
import {type FC}          from "react";
import {AdvancedCalendar} from "./AdvancedCalendar";

export interface IAdvancedCalendarExampleProps {
}

export const AdvancedCalendarExample: FC<IAdvancedCalendarExampleProps> = () => {
    return <Shell>
        <AdvancedCalendar/>
    </Shell>;
};
