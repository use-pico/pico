import {DateInline}                from "@pico/i18n";
import {
    Button,
    Grid,
    Group,
    Text
}                                  from "@pico/ui";
import {classNames}                from "@pico/utils";
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight
}                                  from "@tabler/icons-react";
import {type PropsWithChildren}    from "react";
import {type IYear}                from "../api/years";
import {type ICalendarEventSchema} from "../schema/CalendarEventSchema";
import {YearsOfStore}              from "../store/YearsOfStore";
import {CalendarShell}             from "./CalendarShell";
import {DateRageInline}            from "./DateRageInline";
import classes                     from "./Years.module.css";

export type IYearsProps<TEventSchema extends ICalendarEventSchema = ICalendarEventSchema> = PropsWithChildren<Omit<CalendarShell<TEventSchema>, "children" | "onClick"> & {
    onClick?(props: IYearsProps.OnClickProps): void;
}>;

export namespace IYearsProps {
    export interface OnClickProps {
        year: IYear;
    }
}

export const Years = <TEventSchema extends ICalendarEventSchema = ICalendarEventSchema>(
    {
        children,
        onClick,
        ...props
    }: IYearsProps<TEventSchema>) => {
    const {
        years: {
                   years,
                   isCurrent,
                   start,
                   end,
                   columns,
                   rows,
                   count,
               },
        today,
        prevYear,
        nextYear,
        prevYears,
        nextYears,
    } = YearsOfStore.use();

    return <CalendarShell
        ControlsTopLeft={() => <Group gap={"sm"}>
            <Button.Group>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => prevYears()}
                    leftSection={<IconChevronsLeft/>}
                >
                    <DateInline
                        date={start.minus({year: count})}
                        options={{year: "numeric"}}
                    />
                </Button>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => prevYear()}
                    leftSection={<IconChevronLeft/>}
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
                variant={"subtle"}
                onClick={() => today()}
                disabled={isCurrent}
            >
                <Text c={"dimmed"}>
                    <DateRageInline
                        start={start}
                        end={end}
                        startOptions={{year: "numeric"}}
                        endOptions={{year: "numeric"}}
                    />
                </Text>
            </Button>
        </Group>}
        ControlsTopRight={() => <Group gap={"sm"}>
            <Button.Group>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => nextYear()}
                    rightSection={<IconChevronRight/>}
                >
                    <DateInline
                        date={end.plus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => nextYears()}
                    leftSection={<IconChevronsRight/>}
                >
                    <DateInline
                        date={end.plus({year: count})}
                        options={{year: "numeric"}}
                    />
                </Button>
            </Button.Group>
        </Group>}
        {...props}
    >
        {Array.from({length: rows}, (_, row) => <Grid
            key={`year${row}`}
            columns={columns}
            className={classes.YearRow}
            m={0}
        >
            {Array.from({length: columns}, (_, column) => {
                const year = years[(row * columns) + column];
                if (!year) {
                    return null;
                }
                return <Grid.Col
                    key={year.id}
                    span={1}
                    className={classNames(
                        classes.YearCell,
                        year.isCurrent ? classes.CurrentYear : undefined,
                        year.isSelected ? classes.SelectedYear : undefined,
                    )}
                    style={onClick ? {cursor: "pointer"} : undefined}
                    onClick={() => onClick?.({year})}
                >
                    {year.name}
                </Grid.Col>;
            })}
        </Grid>)}
        {children}
    </CalendarShell>;
};
