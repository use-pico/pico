import {type ValuesSchema}  from "@use-pico2/common";
import {type FC}            from "react";
import type {IWithMutation} from "../query/IWithMutation";
import {Input}              from "./Input";
import {type useForm}       from "./useForm";

export namespace Field {
    export interface Props<
        TWithMutation extends IWithMutation<any, any>,
        TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
    > {
        form: useForm.Form<TWithMutation, TValuesSchema>;
        name: Input.Keys<TValuesSchema>;
    }
}

export const Field = <
    TWithMutation extends IWithMutation<any, any>,
    TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
>(
    {
        form,
        name,
    }: Field.Props<TWithMutation, TValuesSchema>,
) => {
    const Input: FC<Input.Props<TValuesSchema>> = form.hidden.includes(name) ? (() => null) : form.inputs$?.[name as keyof Input.Factory<TValuesSchema>]
        ?? form.inputs[name as keyof Input.Factory<TValuesSchema>]
        ?? (() => null);

    return <Input
        name={name}
        form={form.form}
        schema={form.schema}
    />;
};
