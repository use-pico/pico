import {
    IconChevronLeft,
    IconChevronRight
}                                 from "@tabler/icons-react";
import {
    DateInline,
    DateTime
}                                 from "@use-pico/i18n";
import {useStore}                 from "@use-pico/store";
import {
    Button,
    Grid,
    GridCol,
    Group,
    Text
}                                 from "@use-pico/ui";
import {classNames}               from "@use-pico/utils";
import {
    type PropsWithChildren,
    useCallback
}                                 from "react";
import {type IMonth}              from "../api/months";
import {type CalendarEventSchema} from "../schema/CalendarEventSchema";
import {MonthsOfStore}            from "../store/MonthsOfStore";
import {CalendarShell}            from "./CalendarShell";
import classes                    from "./Months.module.css";

export namespace Months {
    export type Props<
        TEventSchema extends CalendarEventSchema = CalendarEventSchema,
    > = PropsWithChildren<Omit<CalendarShell.Props<TEventSchema>, "children" | "onClick"> & {
        onClick?(props: OnClickProps): void;
    }>;

    export interface OnClickProps {
        month: IMonth;
    }
}

export const Months = <
    TEventSchema extends CalendarEventSchema = CalendarEventSchema,
>(
    {
        children,
        onClick,
        ...props
    }: Months.Props<TEventSchema>
) => {
    const {
        months: {
                    months,
                    isCurrent,
                    date
                },
        today,
        prevYear,
        nextYear,
    } = useStore(MonthsOfStore);
    const columnCount = 4;
    const rowCount = months.length / columnCount;
    return <CalendarShell
        ControlsTopLeft={useCallback(() => <Group gap={"sm"}>
            <Button.Group>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => prevYear()}
                    leftSection={<IconChevronLeft/>}
                >
                    <DateInline
                        date={date.minus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
            </Button.Group>
        </Group>, [])}
        ControlsTopMiddle={() => <Group gap={"sm"}>
            <Button
                variant={"subtle"}
                onClick={() => today()}
                disabled={isCurrent}
            >
                <Text c={"dimmed"}>
                    {isCurrent ?
                        <DateInline date={DateTime.now()} options={{
                            day:   "numeric",
                            month: "long",
                            year:  "numeric"
                        }}/> :
                        <DateInline date={date} options={{year: "numeric"}}/>
                    }
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
                        date={date.plus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
            </Button.Group>
        </Group>}
        {...props}
    >
        {Array.from({length: rowCount}, (_, row) => <Grid
            key={`month${row}`}
            columns={columnCount}
            className={classes.MonthRow}
            m={0}
        >
            {Array.from({length: columnCount}, (_, column) => {
                const month = months[(row * columnCount) + column];
                if (!month) {
                    return null;
                }
                return <GridCol
                    key={month.id}
                    span={1}
                    className={classNames(
                        classes.MonthCell,
                        month.isCurrent ? classes.CurrentMonth : undefined,
                    )}
                    style={onClick ? {cursor: "pointer"} : undefined}
                    onClick={() => onClick?.({month})}
                >
                    {month.name}
                </GridCol>;
            })}
        </Grid>)}
        {children}
    </CalendarShell>;
};
