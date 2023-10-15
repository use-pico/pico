import {useTranslation}    from "@pico/i18n";
import {
    ActionIcon,
    TextInput as CoolTextInput
}                          from "@pico/ui";
import {IconX}             from "@tabler/icons-react";
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
    const shape = (schema as any)?.shape[withControl.name];

    return <CoolTextInput
        label={t(`${withControl.name}.label`)}
        placeholder={t(`${withControl.name}.placeholder`)}
        error={fieldState.error?.message}
        withAsterisk={shape && !shape.isOptional()}
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
