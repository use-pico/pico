"use client";

import {isCallable, type ValuesSchema} from "@use-pico/common";
import {type FC} from "react";
import type {IWithMutation} from "../query/IWithMutation";
import {Input} from "./Input";
import {type useForm} from "./useForm";

export namespace Field {
    export interface Props<
        TWithMutation extends IWithMutation<any, any>,
        TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
    > {
        form: useForm.Form<TWithMutation, TValuesSchema>;
        name: Input.Keys<TValuesSchema>;
        theme?: Input.Theme;
    }
}

export const Field = <
    TWithMutation extends IWithMutation<any, any>,
    TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
>(
    {
        form,
        name,
        theme,
    }: Field.Props<TWithMutation, TValuesSchema>,
) => {
    const useWatch: Input.FactoryProps<TValuesSchema>["useWatch"] = value => form.form.watch(value) as any;
    const useSetValue: Input.FactoryProps<TValuesSchema>["useSetValue"] = () => (key, value) => {
        form.form.setValue(key, value);
    };
    const $inputs = isCallable(form.inputs) ? form.inputs({
        form: form.form,
        useWatch,
        useSetValue,
    }) : form.inputs;
    const $inputOverride = isCallable(form.inputs$) ? form.inputs$({
        form: form.form,
        useWatch,
        useSetValue,
    }) : form.inputs$;

    const Input: FC<Input.Props<TValuesSchema>> = form.hidden.includes(name) ? (() => null) : $inputOverride?.[name as keyof Input.Factory<TValuesSchema>]
        ?? $inputs[name as keyof Input.Factory<TValuesSchema>]
        ?? (() => null);

    return <Input
        name={name}
        schema={form.schema}
        theme={theme}
    />;
};
