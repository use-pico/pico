import {useTranslation}                     from "@pico/i18n";
import {PasswordInput as CoolPasswordInput} from "@pico/ui";
import {useController}                      from "react-hook-form";
import type {ValuesSchema}                  from "../schema/ValuesSchema";
import type {Form}                          from "../ui/Form";

export namespace PasswordInput {
    export interface Props<
        TValuesSchema extends ValuesSchema,
    > extends Form.Input.PropsEx<TValuesSchema, CoolPasswordInput.Props> {
    }
}

export const PasswordInput = <
    TValuesSchema extends ValuesSchema,
>(
    {
        withControl,
        schema,
        onChange: $onChange,
        ...       props
    }: PasswordInput.Props<TValuesSchema>
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

    return <CoolPasswordInput
        label={t(`${withControl.name}.label`)}
        placeholder={t(`${withControl.name}.placeholder`)}
        error={fieldState.error?.message}
        withAsterisk={shape && !shape.isOptional()}
        onChange={e => {
            onChange(e.target.value);
            $onChange?.(e);
        }}
        {...field}
        {...props}
    />;
};
