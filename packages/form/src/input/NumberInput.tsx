import {useTranslation}                 from "@use-pico/i18n";
import {NumberInput as CoolNumberInput} from "@use-pico/ui";
import {isString}                       from "@use-pico/utils";
import {useController}                  from "react-hook-form";
import type {ValuesSchema}              from "../schema/ValuesSchema";
import type {Form}                      from "../ui/Form";

export namespace NumberInput {
    export interface Props<
        TValuesSchema extends ValuesSchema,
    > extends Form.Input.PropsEx<TValuesSchema, CoolNumberInput.Props> {
    }
}

export const NumberInput = <
    TValuesSchema extends ValuesSchema,
>(
    {
        withControl,
        schema,
        onChange: $onChange,
        ...       props
    }: NumberInput.Props<TValuesSchema>
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
    const shape = (schema as any)?.shape[withControl.name];

    return <CoolNumberInput
        label={t(`${withControl.name}.label`)}
        placeholder={t(`${withControl.name}.placeholder`)}
        error={fieldState.error?.message}
        withAsterisk={shape && !shape.isOptional()}
        value={value === null ? NaN : value}
        allowNegative={false}
        onChange={value => {
            $onChange?.(value);
            onChange(isString(value) ? parseFloat(value) : value);
        }}
        {...field}
        {...props}
    />;
};
