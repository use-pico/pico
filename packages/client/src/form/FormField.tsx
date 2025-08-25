import { useCls } from "@use-pico/cls";
import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { FormError } from "./FormError";
import { FormFieldCls } from "./FormFieldCls";

export namespace FormField {
	export type FieldError = any;

	export interface Props
		extends FormFieldCls.Props<
			Omit<InputHTMLAttributes<HTMLInputElement>, "children">
		> {
		label?: ReactNode;
		hint?: ReactNode;
		name: string;
		required?: boolean;
		disabled?: boolean;
		meta: FormError.Meta;
	}
}

export const FormField = forwardRef<HTMLInputElement, FormField.Props>(
	(props, ref) => {
		const {
			label,
			hint,
			name,
			required = false,
			disabled,
			meta,
			tva = FormFieldCls,
			cls,
			...inputProps
		} = props;

		const slots = useCls(tva, cls, ({ what }) => ({
			variant: what.variant({
				isSubmitting: false,
				isLoading: false,
				isError: Boolean(meta.errors?.length),
				required,
				disabled,
			}),
		}));

		return (
			<div className={slots.base()}>
				<div className={"flex flex-row justify-between"}>
					{label ? (
						<label
							htmlFor={name as string}
							className={slots.label()}
						>
							{label}
						</label>
					) : null}
					<FormError
						cls={({ what }) => ({
							variant: what.variant({
								compact: true,
							}),
						})}
						meta={meta}
					/>
				</div>
				{hint ? <div className={slots.hint()}>{hint}</div> : null}
				<input
					{...inputProps}
					ref={ref}
					name={name}
					id={name}
					required={required}
					disabled={disabled}
					className={slots.input()}
				/>
			</div>
		);
	},
);

FormField.displayName = "FormField";
