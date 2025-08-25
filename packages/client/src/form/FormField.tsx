import { useCls } from "@use-pico/cls";
import type { ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";
import { FormError } from "./FormError";
import { FormFieldCls } from "./FormFieldCls";

export namespace FormField {
	export type FieldError = any;

	export namespace Render {
		export interface Props {
			ref: ForwardedRef<any>;
			className: string;
			disabled: boolean;
			id: string;
			meta: FormError.Meta;
			name: string;
			required: boolean;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export interface Props extends FormFieldCls.Props {
		id: string;
		label?: ReactNode;
		hint?: ReactNode;
		name: string;
		required?: boolean;
		disabled?: boolean;
		meta: FormError.Meta;
		render?: Render.RenderFn;
	}
}

export const FormField = forwardRef<any, FormField.Props>((props, ref) => {
	const {
		id,
		label,
		hint,
		name,
		required = false,
		disabled = false,
		meta,
		tva = FormFieldCls,
		cls,
		render = (props) => <input {...props} />,
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
			{label || meta.errors?.length ? (
				<div className={"flex flex-row justify-between"}>
					{label ? (
						<label
							htmlFor={name as string}
							className={slots.label()}
						>
							{label}
						</label>
					) : (
						<div />
					)}
					{meta.errors?.length ? (
						<FormError
							cls={({ what }) => ({
								variant: what.variant({
									compact: true,
								}),
							})}
							meta={meta}
						/>
					) : null}
				</div>
			) : null}
			{hint ? <div className={slots.hint()}>{hint}</div> : null}
			{render({
				className: slots.input(),
				disabled,
				id,
				meta,
				name,
				ref,
				required,
			})}
		</div>
	);
});

FormField.displayName = "FormField";
