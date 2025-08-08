import type { FC, PropsWithChildren, ReactNode } from "react";
import { FormError } from "./FormError";
import { FormFieldCls } from "./FormFieldCls";

export namespace FormField {
	export type FieldError = any;

	export interface Props extends FormFieldCls.Props<PropsWithChildren> {
		label?: ReactNode;
		hint?: ReactNode;
		name: string;
		required?: boolean;
		disabled?: boolean;
		meta: FormError.Meta;
	}
}

export const FormField: FC<FormField.Props> = ({
	label,
	hint,
	name,
	required = false,
	disabled,
	meta,
	children,
	tva = FormFieldCls,
	cls,
}) => {
	const classes = tva.create(cls, {
		variant: {
			isSubmitting: false,
			isLoading: false,
			isError: false,
			required,
			disabled,
		},
	});

	return (
		<div className={classes.base}>
			<div className={"flex flex-row justify-between"}>
				{label ? <label htmlFor={name as string}>{label}</label> : null}
				<FormError
					variant={{
						compact: true,
					}}
					meta={meta}
				/>
			</div>
			{hint ? <div className={"text-sm italic"}>{hint}</div> : null}
			<div className={classes.input}>{children}</div>
		</div>
	);
};
