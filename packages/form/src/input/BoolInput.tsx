import {
    IconInputCheck,
    IconInputX
}                          from "@tabler/icons-react";
import {
    Translation,
    useTranslation
}                          from "@use-pico/i18n";
import {isPartial}         from "@use-pico/schema";
import {
    ActionIcon,
    Flex,
    Switch,
    Tooltip
}                          from "@use-pico/ui";
import {useState}          from "react";
import {useController}     from "react-hook-form";
import {type ValuesSchema} from "../schema/ValuesSchema";
import type {Form}         from "../ui/Form";

export namespace BoolInput {
    export interface Props<
        TValuesSchema extends ValuesSchema,
    > extends Form.Input.PropsEx<TValuesSchema, Switch.Props> {
        onBool?(bool?: boolean): void;
    }
}

export const BoolInput = <
    TValuesSchema extends ValuesSchema,
>(
    {
        withControl,
        schema,
        onChange: $onChange,
        onBool,
        disabled: $disabled,
        ...       props
    }: BoolInput.Props<
        TValuesSchema
    >
) => {
    const t = useTranslation();
    const {
        field: {
                   value,
                   onChange,
                   ...field
               },
        fieldState,
    } = useController(withControl);
    const [disabled, setDisabled] = useState($disabled);

    return <Flex
        gap={"xs"}
        justify={"space-between"}
        align={"center"}
    >
        <Switch
            radius={"xs"}
            disabled={disabled}
            labelPosition={"left"}
            label={t(`${withControl.name}.label`)}
            description={t(`${withControl.name}.description`)}
            checked={value}
            onChange={value => {
                onChange(value);
                $onChange?.(value);
                onBool?.(value.target.checked);
            }}
            error={fieldState.error?.message}
            {...field}
            {...props}
        />
        {!isPartial(schema, withControl.name) && <Tooltip
            label={<Translation namespace={"common.bool-input"} withLabel={"toggle.tooltip"}/>}
        >
            <ActionIcon
                variant={"subtle"}
                onClick={() => setDisabled(disabled => !disabled)}
                color={disabled ? "gray.5" : "green.5"}
            >
                {disabled ? <IconInputX/> : <IconInputCheck/>}
            </ActionIcon>
        </Tooltip>}
    </Flex>;
};
