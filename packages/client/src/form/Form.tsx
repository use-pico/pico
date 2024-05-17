"use client";

import {
    cn,
    type ValuesSchema
}                           from "@use-pico2/common";
import {
    type PropsWithChildren,
    type ReactNode,
    useMemo
}                           from "react";
import type {IWithMutation} from "../query/IWithMutation";
import {Button}             from "../ui/Button";
import {useForm}            from "./useForm";

export namespace Form {
    /**
     * If you need to export your own form, you should use this type as a base
     */
    export type PropsEx<
        TWithMutation extends IWithMutation<any, any>,
        TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
    > = Omit<Props<TWithMutation, TValuesSchema>, "form">;

    export type Props<
        TWithMutation extends IWithMutation<any, any>,
        TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
    > = PropsWithChildren<
        {
            icon?: {
                enabled?: string;
                disabled?: string;
            };
            /**
             * Various texts used inside the form.
             */
            text?: {
                /**
                 * Submit button label.
                 */
                submit?: ReactNode;
            };
            form: useForm.FormEx<TWithMutation, TValuesSchema>;
        } & cn.WithClass>
}

/**
 * Opinionated form component - uses mutation and idea of "values" for values used in the form, request (comming to mutation) and response (coming from mutation).
 */
export const Form = <
    TWithMutation extends IWithMutation<any, any>,
    TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
>(
    {
        icon,
        text,
        form,
        children,
        cx,
    }: Form.Props<TWithMutation, TValuesSchema>
) => {
    const body = useMemo(() => children, [
        form.form.formState.isLoading,
        form.form.formState.isSubmitting,
        form.form.formState.isSubmitSuccessful,
        form.form.formState.isSubmitted,
    ]);

    return <form
        className={cn(
            "flex", "flex-col",
            "items-center", "justify-center",
            "gap-4",
            cx,
        )}
        onSubmit={form.onSubmit()}
    >
        {!form.form.formState.isLoading && <>
            {body}
            <Button
                icon={icon}
                disabled={!form.form.formState.isValid || form.form.formState.isSubmitting || form.form.formState.isLoading}
                loading={form.form.formState.isSubmitting || form.form.formState.isLoading}
                cx={[
                    "mx-auto", "text-center",
                ]}
                type={"submit"}
            >
                {text?.submit}
            </Button>
        </>}
    </form>;
};
