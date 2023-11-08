import {isPartial}                          from "@use-pico/schema";
import {PasswordInput as CoolPasswordInput} from "@use-pico/ui";
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
    const {
        field: {
                   onChange,
                   ...field
               },
        fieldState,
    } = useController(withControl);

    return <CoolPasswordInput
        error={fieldState.error?.message}
        withAsterisk={!isPartial(schema, withControl.name)}
        onChange={e => {
            onChange(e.target.value);
            $onChange?.(e);
        }}
        {...field}
        {...props}
    />;
};
