"use client";

import {
    cn,
    type ValuesSchema
}                           from "@use-pico/common";
import {
    type PropsWithChildren,
    type ReactNode
}                           from "react";
import {FormProvider}       from "react-hook-form";
import type {IWithMutation} from "../query/IWithMutation";
import {Button}             from "../ui/Button";
import {useForm}            from "./useForm";

export namespace Form {
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
            theme?: useForm.Theme;
            /**
             * Additional options for the form.
             */
            options?: Partial<useForm.Props<TWithMutation, TValuesSchema>>;
        }>

    /**
     * If you need to export your own form, you should use this type as a base
     *
     * @template TWithMutation Mutation used in a form.
     * @template TValuesSchema Schema of values used in a form.
     */
    export type PropsEx<
        TWithMutation extends IWithMutation<any, any>,
        TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
    > = Omit<Props<TWithMutation, TValuesSchema>, "form">;
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
        theme,
    }: Form.Props<TWithMutation, TValuesSchema>
) => {
    return <FormProvider
        {...form.form}
    >
        <form
            className={cn(
                "flex flex-col gap-4",
                "items-center justify-center",
                form?.theme?.root,
                theme?.root,
            )}
            onSubmit={form.onSubmit()}
        >
            {!form.form.formState.isLoading && <>
                {children}
                <Button
                    icon={icon}
                    disabled={!form.form.formState.isValid || form.form.formState.isSubmitting || form.form.formState.isLoading}
                    loading={form.form.formState.isSubmitting || form.form.formState.isLoading}
                    cx={[
                        "mx-auto text-center",
                        form?.theme?.submit,
                        theme?.submit,
                    ]}
                    type={"submit"}
                >
                    {text?.submit}
                </Button>
            </>}
        </form>
    </FormProvider>;
};
