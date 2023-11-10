"use client";

import {tx}             from "@use-pico/i18n";
import {Button}         from "@use-pico/ui";
import {
    type FC,
    type ReactNode
}                       from "react";
import {useFormContext} from "react-hook-form";

export namespace SubmitButton {
    export interface Props extends Omit<Button.Props, "form" | "children"> {
        label?: ReactNode;
        isBusy?: boolean;
    }
}

export const SubmitButton: FC<SubmitButton.Props> = (
    {
        label,
        ...props
    },
) => {
    const form = useFormContext();

    return <Button
        size={"lg"}
        disabled={!form.formState.isValid || form.formState.isSubmitting || form.formState.isLoading}
        type={"submit"}
        {...props}
    >
        {label ?? tx()`Submit`}
    </Button>;
};
