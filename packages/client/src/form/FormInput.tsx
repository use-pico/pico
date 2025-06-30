import type { PropsWithChildren, ReactNode } from "react";
import type { FormState } from "react-hook-form";
import { FormError } from "./FormError";
import { FormInputCls } from "./FormInputCls";

export namespace FormInput {
	export interface Props<TFormState extends FormState<any>>
		extends FormInputCls.Props<PropsWithChildren> {
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
	tva = FormInputCls,
	cls,
}: FormInput.Props<TFormState>) => {
	const { slots } = tva(
		{
			isSubmitting: formState.isSubmitting,
			isLoading: formState.isLoading,
			isError: Boolean(formState.errors[name]),
			required,
			disabled,
			...variant,
		},
		cls,
	);

	return (
		<div className={slots.base()}>
			<div className={"flex flex-row justify-between"}>
				{label ? <label htmlFor={name as string}>{label}</label> : null}
				<FormError
					variant={{
						compact: true,
					}}
					error={formState.errors[name]}
				/>
			</div>
			{hint ? <div className={"text-sm italic"}>{hint}</div> : null}
			<div className={slots.input()}>{children}</div>
		</div>
	);
};
