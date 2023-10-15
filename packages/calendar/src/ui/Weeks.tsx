import {
    DateInline,
    DateTime
}                            from "@pico/i18n";
import {
    ActionIcon,
    Box,
    Button,
    Grid,
    Group,
    Text
}                            from "@pico/ui";
import {classNames}          from "@pico/utils";
import {
    IconCalendarEvent,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight
}                            from "@tabler/icons-react";
import {
    type PropsWithChildren,
    useState
}                            from "react";
import {
    type IDay,
    type IWeeks
}                            from "../api/weeks";
import {CalendarEventSchema} from "../schema/CalendarEventSchema";
import {WeeksOfStore}        from "../store/WeeksOfStore";
import {CalendarShell}       from "./CalendarShell";
import classes               from "./Weeks.module.css";

export namespace Weeks {
    export type Props<
        TEventSchema extends CalendarEventSchema = CalendarEventSchema,
    > = PropsWithChildren<Omit<CalendarShell.Props<TEventSchema>, "children" | "onClick" | "onChange"> & {
        onClick?(props: OnClickProps): void;
        onChange?(props: OnChangeProps): void;

        weekCountSize?: number;
        defaultWithWeekNo?: boolean;
        columnSize?: number;
        highlightToday?: boolean;
    }>

    export type Classes = typeof classes;

    export interface OnClickProps {
        day: IDay;
    }

    export interface OnChangeProps {
        weeks: IWeeks;
    }
}

export const Weeks = <
    TEventSchema extends CalendarEventSchema = CalendarEventSchema,
>(
    {
        onClick,
        onChange: $onChange = () => null,
        highlightToday = true,
        defaultWithWeekNo = false,
        weekCountSize = 1,
        columnSize = 3,
        children,
        ...props
    }: Weeks.Props<TEventSchema>
) => {
    const {
        nextMonth,
        prevMonth,
        prevYear,
        nextYear,
        today,
        weeks: {
                   weeks,
                   list,
                   start,
                   isCurrent,
               }
    } = WeeksOfStore.use();
    const [withWeeks, setWithWeeks] = useState(defaultWithWeekNo);
    const onChange: Weeks.Props<TEventSchema>["onChange"] = props => {
        $onChange?.(props);
    };

    /**
     * This is specific for Mantine Grid: compute number of columns to render.
     */
    const columnCount = (list.length * columnSize) + (withWeeks ? weekCountSize : 0);

    return <CalendarShell
        ControlsTopLeft={() => <Group gap={"sm"}>
            <Button.Group>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => onChange({weeks: prevMonth()})}
                    leftSection={<IconChevronLeft/>}
                >
                    <DateInline
                        date={start.minus({month: 1})}
                        options={{month: "long"}}
                    />
                </Button>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => onChange({weeks: prevYear()})}
                    leftSection={<IconChevronsLeft/>}
                >
                    <DateInline
                        date={start.minus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
            </Button.Group>
        </Group>}
        ControlsTopMiddle={() => <Group gap={"sm"}>
            <Button
                size={"sm"}
                variant={"subtle"}
                onClick={() => onChange({weeks: today()})}
                disabled={isCurrent}
            >
                <Text c={"dimmed"}>
                    {isCurrent ?
                        <DateInline date={DateTime.now()} options={{
                            day:   "numeric",
                            month: "long",
                            year:  "numeric"
                        }}/> :
                        <DateInline date={start} options={{
                            month: "long",
                            year:  "numeric"
                        }}/>
                    }
                </Text>
            </Button>
        </Group>}
        ControlsTopRight={() => <Group gap={"sm"}>
            <Button.Group>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => onChange({weeks: nextYear()})}
                    rightSection={<IconChevronsRight/>}
                >
                    <DateInline
                        date={start.plus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => onChange({weeks: nextMonth()})}
                    rightSection={<IconChevronRight/>}
                >
                    <DateInline
                        date={start.plus({month: 1})}
                        options={{month: "long"}}
                    />
                </Button>
            </Button.Group>
        </Group>}
        ControlsBottomLeft={() => <ActionIcon
            variant={"subtle"}
            onClick={() => setWithWeeks(weeks => !weeks)}
        >
            <IconCalendarEvent/>
        </ActionIcon>}
        {...props}
    >
        {/*
            First of all: render header with all days of the week; they're already localized from
            the calendar, so it's just simple render here.
         */}
        <Grid
            columns={columnCount}
            className={classes.HeaderGrid}
            m={0}
        >
            {withWeeks && <Grid.Col
                span={weekCountSize}
                className={classes.HeaderCell}
            />}
            {list.map(day => <Grid.Col
                key={`day-${day}`}
                span={columnSize}
                className={classes.HeaderCell}
            >
                {day}
            </Grid.Col>)}
        </Grid>
        {/*
            Quite simple stuff: take all weeks computed by the calendar and render them. That's all
         */}
        {weeks.map(({
                        days,
                        number,
                        isCurrent,
                        id
                    }) => <Grid
            key={id}
            columns={columnCount}
            className={classNames(
                classes.WeekRow,
                isCurrent ? classes.CurrentWeek : undefined,
            )}
            m={0}
        >
            {withWeeks && <Grid.Col
                span={weekCountSize}
                className={classes.WeekNumber}
            >
                {number}.
            </Grid.Col>}
            {/*
                Grid is already properly setup (number of columns), so render day by day as a calendar says.
             */}
            {days.map(day => <Grid.Col
                key={day.id}
                span={columnSize}
                className={classNames(
                    day.isCurrent && highlightToday ? classes.CurrentDay : undefined,
                    day.isSelected ? classes.SelectedDay : undefined,
                    day.isOutOfRange ? classes.OutOfRange : classes.InRange,
                    classes.WeekCell,
                )}
                style={onClick ? {cursor: "pointer"} : undefined}
                onClick={() => onClick?.({day})}
            >
                <Box
                    className={classes.Day}
                >
                    {day.day.day}
                </Box>
            </Grid.Col>)}
        </Grid>)}
        {children}
    </CalendarShell>;
};
