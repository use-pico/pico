import type { FC, PropsWithChildren, ReactNode } from "react";
import { FormError } from "./FormError";
import { FormInputCls } from "./FormInputCls";

export namespace FormInput {
	export interface Props extends FormInputCls.Props<PropsWithChildren> {
		label?: ReactNode;
		hint?: ReactNode;
		name: string;
		required?: boolean;
		disabled?: boolean;
		errors: string[] | undefined;
	}
}

export const FormInput: FC<FormInput.Props> = ({
	label,
	hint,
	name,
	required = false,
	disabled,
	errors,
	children,
	variant,
	tva = FormInputCls,
	cls,
}) => {
	const { slots } = tva(
		{
			isSubmitting: false,
			isLoading: false,
			isError: false,
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
					errors={errors}
				/>
			</div>
			{hint ? <div className={"text-sm italic"}>{hint}</div> : null}
			<div className={slots.input()}>{children}</div>
		</div>
	);
};
