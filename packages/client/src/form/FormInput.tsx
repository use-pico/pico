import type { ReactNode } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import type { FormState } from "react-hook-form";
import { FormError } from "./FormError";
import { FormInputCss } from "./FormInputCss";

export namespace FormInput {
	export interface Props<TFormState extends FormState<any>>
		extends FormInputCss.Props<PropsWithChildren> {
		label?: ReactNode;
		required?: boolean;
		formState: TFormState;
		name: keyof TFormState["errors"];
	}
}

export const FormInput = <TFormState extends FormState<any>>({
	label,
	required = false,
	formState,
	name,
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
			<div className={tv.input()}>{children}</div>
		</div>
	);
};
