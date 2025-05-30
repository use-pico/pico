import type { ReactNode } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import type { FormState } from "react-hook-form";
import { FormError } from "./FormError";
import { FormInputCss } from "./FormInputCss";

export namespace FormInput {
	export interface Props<TFormState extends FormState<any>>
		extends FormInputCss.Props<PropsWithChildren> {
		label?: ReactNode;
		hint?: ReactNode;
		required?: boolean;
		formState: TFormState;
		name: keyof TFormState["errors"];
		disabled?: boolean;
	}
}

export const FormInput = <TFormState extends FormState<any>>({
	label,
	hint,
	required = false,
	formState,
	name,
	disabled,
	children,
	variant,
	tva = FormInputCss,
	css,
}: FormInput.Props<TFormState>) => {
	const tv = tva({
		isSubmitting: formState.isSubmitting,
		isLoading: formState.isLoading,
		isError: Boolean(formState.errors[name]),
		required,
		disabled,
		...variant,
		css,
	}).slots;

	return (
		<div className={tv.base()}>
			<div className={"flex flex-row justify-between"}>
				{label ?
					<label htmlFor={name as string}>{label}</label>
				:	null}
				<FormError
					variant={{ compact: true }}
					error={formState.errors[name]}
				/>
			</div>
			{hint ?
				<div className={"text-sm italic"}>{hint}</div>
			:	null}
			<div className={tv.input()}>{children}</div>
		</div>
	);
};
