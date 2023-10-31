"use client";

import {
    IconCalendarSearch,
    IconX
}                            from "@tabler/icons-react";
import {DateInline}          from "@use-pico/i18n";
import {useStore}            from "@use-pico/store";
import {
    ActionIcon,
    Box,
    Button,
    Overlay
}                            from "@use-pico/ui";
import {useState}            from "react";
import {CalendarEventSchema} from "../schema/CalendarEventSchema";
import {MonthsOfStore}       from "../store/MonthsOfStore";
import {WeeksOfStore}        from "../store/WeeksOfStore";
import {YearsOfStore}        from "../store/YearsOfStore";
import {Months}              from "./Months";
import {Weeks}               from "./Weeks";
import {Years}               from "./Years";

export namespace Calendar {
    export interface Props<
        TEventSchema extends CalendarEventSchema = CalendarEventSchema,
    > extends Weeks.Props<TEventSchema> {
        withControls?: boolean;
    }
}

export const Calendar = <
    TEventSchema extends CalendarEventSchema = CalendarEventSchema,
>(
    {
        onClick,
        withControls = true,
        onChange,
        ...props
    }: Calendar.Props<TEventSchema>) => {
    const weeksOf = useStore(WeeksOfStore, (
        {
            weeksOf,
            weeks
        }) => ({
        weeksOf,
        weeks
    }));
    const monthsOf = useStore(MonthsOfStore, ({monthsOf}) => ({monthsOf}));
    const yearsOf = useStore(YearsOfStore, ({yearsOf}) => ({yearsOf}));
    const [selectMonth, setSelectMonth] = useState(false);
    const [selectYear, setSelectYear] = useState(false);

    return <Box pos={"relative"}>
        <Weeks<TEventSchema>
            onClick={onClick}
            withControls={withControls}
            onChange={onChange}
            ControlsBottomMiddle={() => <Button.Group>
                <Button
                    size={"md"}
                    variant={"subtle"}
                    onClick={() => {
                        setSelectMonth(true);
                        monthsOf.monthsOf(weeksOf.weeks.date);
                    }}
                    leftSection={<IconCalendarSearch/>}
                >
                    <DateInline date={weeksOf.weeks.date} options={{month: "long"}}/>
                </Button>
                <Button
                    size={"md"}
                    variant={"subtle"}
                    onClick={() => {
                        setSelectYear(true);
                        yearsOf.yearsOf(weeksOf.weeks.date);
                    }}
                    leftSection={<IconCalendarSearch/>}
                >
                    <DateInline date={weeksOf.weeks.date} options={{year: "numeric"}}/>
                </Button>
            </Button.Group>}
            {...props}
        >
            {selectMonth && <Overlay
                color={"#FFF"}
                backgroundOpacity={1}
            >
                <Months<TEventSchema>
                    onClick={({month: {month}}) => {
                        const weeks = weeksOf.weeksOf(month);
                        onChange?.({weeks});
                        setSelectMonth(false);
                    }}
                    ControlsBottomMiddle={() => <ActionIcon
                        variant={"subtle"}
                        onClick={() => setSelectMonth(false)}
                        c={"gray"}
                    >
                        <IconX/>
                    </ActionIcon>}
                />
            </Overlay>}
            {selectYear && <Overlay
                color={"#FFF"}
                backgroundOpacity={1}
            >
                <Years<TEventSchema>
                    onClick={({year: {year}}) => {
                        const weeks = weeksOf.weeksOf(year);
                        onChange?.({weeks});
                        setSelectYear(false);
                    }}
                    ControlsBottomMiddle={() => <ActionIcon
                        variant={"subtle"}
                        onClick={() => setSelectYear(false)}
                        c={"gray"}
                    >
                        <IconX/>
                    </ActionIcon>}
                />
            </Overlay>}
        </Weeks>
    </Box>;
};
