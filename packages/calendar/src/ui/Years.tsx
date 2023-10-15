import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight
}                                 from "@tabler/icons-react";
import {DateInline}               from "@use-pico/i18n";
import {
    Button,
    Grid,
    Group,
    Text
}                                 from "@use-pico/ui";
import {classNames}               from "@use-pico/utils";
import {type PropsWithChildren}   from "react";
import {type IYear}               from "../api/years";
import {type CalendarEventSchema} from "../schema/CalendarEventSchema";
import {YearsOfStore}             from "../store/YearsOfStore";
import {CalendarShell}            from "./CalendarShell";
import {DateRageInline}           from "./DateRageInline";
import classes                    from "./Years.module.css";

export namespace Years {
    export type Props<
        TEventSchema extends CalendarEventSchema = CalendarEventSchema,
    > = PropsWithChildren<Omit<CalendarShell.Props<TEventSchema>, "children" | "onClick"> & {
        onClick?(props: OnClickProps): void;
    }>;

    export interface OnClickProps {
        year: IYear;
    }
}

export const Years = <
    TEventSchema extends CalendarEventSchema = CalendarEventSchema,
>(
    {
        children,
        onClick,
        ...props
    }: Years.Props<TEventSchema>
) => {
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
