import {useTranslation}       from "@use-pico/i18n";
import {Select as CoolSelect} from "@use-pico/ui";
import {useController}        from "react-hook-form";
import {type ValuesSchema}    from "../schema/ValuesSchema";
import {type Form}            from "../ui/Form";

export namespace SelectInput {
    export interface Props<
        TValuesSchema extends ValuesSchema,
    > extends Form.Input.PropsEx<TValuesSchema, CoolSelect.Props> {
        toValue?(value: string | null): any;
    }
}

export const SelectInput = <
    TValuesSchema extends ValuesSchema,
>(
    {
        withControl,
        schema,
        toValue = value => value,
        onChange: $onChange,
        ...       props
    }: SelectInput.Props<
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

    return <CoolSelect
        label={t(`${withControl.name}.label`)}
        placeholder={t(`${withControl.name}.placeholder`)}
        error={fieldState.error?.message}
        withAsterisk={shape && !shape.isOptional()}
        allowDeselect
        clearable
        onChange={e => {
            const value = toValue(e);
            onChange(value);
            $onChange?.(value);
        }}
        {...field}
        {...props}
    />;
};
