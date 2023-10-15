import {
    Box,
    Grid
}                            from "@pico/ui";
import {classNames}          from "@pico/utils";
import {
    type FC,
    PropsWithChildren
}                            from "react";
import {CalendarEventSchema} from "../schema/CalendarEventSchema";
import classes               from "./CalendarShell.module.css";

export namespace CalendarShell {
    export type Props<
        TEventSchema extends CalendarEventSchema,
    > = PropsWithChildren<{
        schema?: TEventSchema;
        withControls?: boolean;
        ControlsTopLeft?: CalendarShell.Component;
        ControlsTopMiddle?: CalendarShell.Component;
        ControlsTopRight?: CalendarShell.Component;
        ControlsBottomLeft?: CalendarShell.Component;
        ControlsBottomMiddle?: CalendarShell.Component;
        ControlsBottomRight?: CalendarShell.Component;
    }>

    export type Classes = typeof classes;

    export type Component = FC<ComponentProps>;

    export interface ComponentProps {
        classes: Classes;
    }
}

/**
 * Styled shell for Calendar.
 */
export const CalendarShell = <
    TEventSchema extends CalendarEventSchema = CalendarEventSchema,
>(
    {
        withControls = true,
        ControlsTopLeft,
        ControlsTopMiddle,
        ControlsTopRight,
        ControlsBottomLeft,
        ControlsBottomMiddle,
        ControlsBottomRight,
        children,
    }: CalendarShell.Props<TEventSchema>
) => {
    const controlColumnCount = 18;
    const controlWidth = 7;

    const WithControlsTopLeft = ControlsTopLeft || (() => null);
    const WithControlsTopMiddle = ControlsTopMiddle || (() => null);
    const WithControlsTopRight = ControlsTopRight || (() => null);
    const WithControlsBottomLeft = ControlsBottomLeft || (() => null);
    const WithControlsBottomMiddle = ControlsBottomMiddle || (() => null);
    const WithControlsBottomRight = ControlsBottomRight || (() => null);

    const renderProps: CalendarShell.ComponentProps = {
        classes,
    };

    return <Box
        className={classes.Calendar}
    >
        {withControls && <Grid
            columns={controlColumnCount}
            className={classNames(
                classes.ControlsPrefix,
            )}
            m={0}
            p={"xs"}
        >
            <Grid.Col
                span={controlWidth}
                className={classNames(
                    classes.Controls,
                    classes.ControlsLeft,
                )}
            >
                <WithControlsTopLeft {...renderProps}/>
            </Grid.Col>
            <Grid.Col
                span={controlColumnCount - (controlWidth * 2)}
                className={classNames(
                    classes.Controls,
                    classes.ControlsMiddle,
                )}
            >
                <WithControlsTopMiddle {...renderProps}/>
            </Grid.Col>
            <Grid.Col
                span={controlWidth}
                className={classNames(
                    classes.Controls,
                    classes.ControlsRight,
                )}
            >
                <WithControlsTopRight {...renderProps}/>
            </Grid.Col>
        </Grid>}
        {children}
        {withControls && (ControlsBottomLeft || ControlsBottomMiddle || ControlsBottomRight) && <Grid
            columns={controlColumnCount}
            className={classNames(
                classes.ControlsSuffix,
            )}
            m={0}
            p={"xs"}
        >
            <Grid.Col
                span={controlWidth}
                className={classNames(
                    classes.Controls,
                    classes.ControlsLeft,
                )}
            >
                <WithControlsBottomLeft {...renderProps}/>
            </Grid.Col>
            <Grid.Col
                span={controlColumnCount - (controlWidth * 2)}
                className={classNames(
                    classes.Controls,
                    classes.ControlsMiddle,
                )}
            >
                <WithControlsBottomMiddle {...renderProps}/>
            </Grid.Col>
            <Grid.Col
                span={controlWidth}
                className={classNames(
                    classes.Controls,
                    classes.ControlsRight,
                )}
            >
                <WithControlsBottomRight {...renderProps}/>
            </Grid.Col>
        </Grid>}
    </Box>;
};
