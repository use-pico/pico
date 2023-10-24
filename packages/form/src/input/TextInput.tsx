import {IconX}             from "@tabler/icons-react";
import {useTranslation}    from "@use-pico/i18n";
import {isPartial}         from "@use-pico/schema";
import {
    ActionIcon,
    TextInput as CoolTextInput
}                          from "@use-pico/ui";
import {useController}     from "react-hook-form";
import {type ValuesSchema} from "../schema/ValuesSchema";
import {type Form}         from "../ui/Form";

export namespace TextInput {
    export interface Props<
        TValuesSchema extends ValuesSchema,
    > extends Form.Input.PropsEx<TValuesSchema, CoolTextInput.Props> {
    }
}

export const TextInput = <
    TValuesSchema extends ValuesSchema,
>(
    {
        withControl,
        schema,
        onChange: $onChange,
        ...       props
    }: TextInput.Props<
        TValuesSchema
    >
) => {
    const t = useTranslation();
    const {
        field: {
                   onChange,
                   ...field
               },
        fieldState,
    } = useController(withControl);

    return <CoolTextInput
        label={t(`${withControl.name}.label`)}
        placeholder={t(`${withControl.name}.placeholder`)}
        error={fieldState.error?.message}
        withAsterisk={!isPartial(schema, withControl.name)}
        rightSection={<ActionIcon
            color={"gray"}
            variant={"subtle"}
            onClick={() => {
                onChange("");
            }}
        >
            <IconX/>
        </ActionIcon>}
        onChange={e => {
            onChange(e);
            $onChange?.(e);
        }}
        {...field}
        {...props}
    />;
};
