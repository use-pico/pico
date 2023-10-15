import {Translation}       from "@pico/i18n";
import {
    ActionIcon,
    Box,
    Flex,
    Group,
    Loader,
    Text,
    WithIcon
}                          from "@pico/ui";
import {classNames}        from "@pico/utils";
import {
    IconClick,
    IconX
}                          from "@tabler/icons-react";
import {
    type ComponentProps,
    PropsWithChildren,
    type ReactNode
}                          from "react";
import {useController}     from "react-hook-form";
import type {ValuesSchema} from "../schema/ValuesSchema";
import type {Form}         from "../ui/Form";
import {Description}       from "./Description";
import {Error}             from "./Error";
import classes             from "./InputEx.module.css";
import {Label}             from "./Label";

export namespace InputEx {
    export type Props<
        TValuesSchema extends ValuesSchema,
    > = PropsWithChildren<Form.Input.Props<TValuesSchema> & {
        disabled?: boolean;
        icon?: ReactNode;
        isLoading?: boolean;
        onClick?: ComponentProps<typeof Group>["onClick"];

        onClear?(): any;
    }>

    export type Classes = typeof classes;
}

export const InputEx = <
    TValuesSchema extends ValuesSchema,
>(
    {
        withControl,
        schema,
        disabled,
        icon = <IconClick/>,
        children,
        isLoading = false,
        onClick,
        onClear
    }: InputEx.Props<TValuesSchema>
) => {
    const {
        field: {
                   onChange,
               },
        fieldState,
    } = useController(withControl);
    const shape = (schema as any)?.shape[withControl.name];

    return <>
        <Label
            withAsterisk={shape && !shape.isOptional()}
            label={`${withControl.name}.label`}
        />
        <Description description={`${withControl.name}.description`}/>
        <Flex
            onClick={disabled ? undefined : onClick}
            className={classNames([
                classes.item,
                disabled ? classes.disabled : undefined,
            ])}
            align={"center"}
            justify={"space-between"}
            p={4}
        >
            <Flex
                align={"center"}
                gap={"xs"}
            >
                <WithIcon
                    variant={"subtle"}
                    c={fieldState.error ? "red" : (disabled ? "orange" : "gray")}
                    icon={icon}
                />
                <Box>
                    <Text
                        component={"div"}
                        size={"sm"}
                        fw={"400"}
                    >
                        {isLoading ? <Loader size={"sm"} type={"dots"}/> : (children || <Text
                            c={fieldState.error ? "red" : (disabled ? "orange" : "dimmed")}
                        >
                            <Translation withLabel={`${withControl.name}.placeholder`}/>
                        </Text>)}
                    </Text>
                    <Error error={fieldState.error?.message}/>
                </Box>
            </Flex>
            {children && !disabled ? <ActionIcon
                variant={"subtle"}
                color={"gray"}
                onClick={e => {
                    e.stopPropagation();
                    onChange(onClear?.() || "");
                }}
            >
                <IconX/>
            </ActionIcon> : null}
        </Flex>
    </>;
};
